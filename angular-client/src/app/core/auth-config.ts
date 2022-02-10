import { AuthConfig } from 'angular-oauth2-oidc';

const baseAuthUrl = 'https://auth.xxxxxxx.xxx';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://cognito-idp.xxxxxxxx.amazonaws.com/xxxxxxxxx',

  strictDiscoveryDocumentValidation: false,

  redirectUri: `${window.location.origin}/signin-cognito`,

  logoutUrl: `${baseAuthUrl}/logout`,

  postLogoutRedirectUri: `${window.location.origin}/bye`,

  clientId: 'xxxxxxxxxxxxx',

  responseType: 'code',

  scope: 'openid profile email phone',

  showDebugInformation: true,

  revocationEndpoint: `${baseAuthUrl}/oauth2/revoke`,
};
