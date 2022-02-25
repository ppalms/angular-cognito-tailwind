import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AWSService {
  private ssm: AWS.SSM;

  constructor() {
    AWS.config.update({
      accessKeyId: environment.ssmUserAccessKeyId,
      secretAccessKey: environment.ssmUserSecretAccessKey,
      region: environment.ssmUserRegion,
    });

    this.ssm = new AWS.SSM();
  }

  async getAuthParams(): Promise<AWS.SSM.ParameterList> {
    const awsParamResult = await this.ssm
      .getParametersByPath({
        Path: environment.ssmAuthParamPath,
        WithDecryption: true,
      })
      .promise();

    if (!awsParamResult.Parameters) {
      throw new TypeError('Auth param retrieval failed');
    }

    return awsParamResult.Parameters;
  }
}
