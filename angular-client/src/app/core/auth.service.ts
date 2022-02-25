import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpUrlEncodingCodec,
} from '@angular/common/http';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AWSService } from '../shared/aws.service';
import { codeFlowConfigFactory } from './auth-config-factory';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get loggedIn() {
    return (
      this.oauthService.hasValidIdToken() &&
      this.oauthService.hasValidAccessToken()
    );
  }

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private http: HttpClient
  ) {
    if (!environment.production) {
      oauthService.events.subscribe((event) => {
        if (event instanceof OAuthErrorEvent) {
          console.error('OAuthErrorEvent Object:', event);
        } else {
          console.warn('OAuthEvent Object:', event);
        }
      });
    }
  }

  logIn(stateUrl?: string) {
    this.oauthService.initCodeFlow(stateUrl);
  }

  async logOut() {
    let revocationParams = new HttpParams({
      encoder: new HttpUrlEncodingCodec(),
    });

    revocationParams = revocationParams
      .set('client_id', this.oauthService.clientId!)
      .set('token', this.oauthService.getRefreshToken())
      .set('token_type_hint', 'refresh_token');

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    try {
      await lastValueFrom(
        this.http.post(
          this.oauthService.revocationEndpoint!,
          revocationParams,
          { headers }
        )
      );
    } finally {
      const cognitoLogOutParams = {
        client_id: this.oauthService.clientId,
        logout_uri: this.oauthService.postLogoutRedirectUri,
      };

      this.oauthService.logOut(cognitoLogOutParams);
    }
  }

  async runInitialLoginSequence(awsService: AWSService): Promise<void> {
    await this.configureAuthorizationCodeFlow(awsService);

    return this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      // If the user attempted to access a protected route before being
      // redirected to the login page, send them there
      if (
        this.oauthService.state &&
        this.oauthService.state !== 'undefined' &&
        this.oauthService.state !== 'null'
      ) {
        let stateUrl = this.oauthService.state;
        if (stateUrl.startsWith('/') === false) {
          stateUrl = decodeURIComponent(stateUrl);
        }

        this.router.navigateByUrl(stateUrl);
      }
    });
  }

  private async configureAuthorizationCodeFlow(awsService: AWSService) {
    const codeFlowConfig = await codeFlowConfigFactory(awsService);

    this.oauthService.configure(codeFlowConfig);
  }
}

export function authAppInitializerFactory(
  authService: AuthService,
  awsService: AWSService
): () => Promise<void> {
  return () => authService.runInitialLoginSequence(awsService);
}
