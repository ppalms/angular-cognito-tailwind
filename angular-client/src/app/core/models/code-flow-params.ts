export class CodeFlowParams {
  // auth_issuer
  public issuer?: string;

  // auth_base_url
  public baseUrl?: string;

  // angular_client_id
  public clientId?: string;

  constructor(awsParams: AWS.SSM.ParameterList) {
    // TODO validate awsParams

    awsParams?.forEach((param: AWS.SSM.Parameter) => {
      const paramName = param.Name?.split('/').pop();

      switch (paramName) {
        case 'auth_issuer':
          this.issuer = param.Value;
          break;
        case 'auth_base_url':
          this.baseUrl = param.Value;
          break;
        case 'angular_client_id':
          this.clientId = param.Value;
          break;
        default:
          break;
      }
    });
  }
}
