import { AuthConfig } from 'angular-oauth2-oidc';
import { AWSService } from '../shared/aws.service';
import { CodeFlowParams } from './models/code-flow-params';

export async function codeFlowConfigFactory(
  aws: AWSService
): Promise<AuthConfig> {
  const awsAuthParams = await aws.getAuthParams();
  const codeFlowParams = new CodeFlowParams(awsAuthParams);

  return {
    issuer: codeFlowParams.issuer,

    strictDiscoveryDocumentValidation: false,

    redirectUri: `${window.location.origin}/signin-cognito`,

    logoutUrl: `${codeFlowParams.baseUrl}/logout`,

    postLogoutRedirectUri: `${window.location.origin}/bye`,

    clientId: codeFlowParams.clientId,

    responseType: 'code',

    scope: 'openid profile email phone',

    showDebugInformation: true,

    revocationEndpoint: `${codeFlowParams.baseUrl}/oauth2/revoke`,
  };
}
