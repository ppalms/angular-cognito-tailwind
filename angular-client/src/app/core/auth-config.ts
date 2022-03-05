import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const codeFlowConfig: AuthConfig = {
  issuer: environment.codeFlowConfig.issuer,

  strictDiscoveryDocumentValidation: false,

  redirectUri: `${window.location.origin}/signin-cognito`,

  logoutUrl: `${environment.codeFlowConfig.baseUrl}/logout`,

  postLogoutRedirectUri: `${window.location.origin}/bye`,

  clientId: environment.codeFlowConfig.clientId,

  responseType: 'code',

  scope: 'openid profile email phone',

  showDebugInformation: true,

  revocationEndpoint: `${environment.codeFlowConfig.baseUrl}/oauth2/revoke`,
};
