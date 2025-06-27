import { z } from 'zod';

import { IController, IResponse } from '../interfaces/IController';
import { IOAuthService } from '../interfaces/IOAuthService';
import { IRequest } from '../interfaces/IRequest';

const schema = z.object({
  code: z.string(),
  redirectUri: z.string().url(),
});

export class SignWithGithubController implements IController {
  constructor(private readonly githubService: IOAuthService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { code, redirectUri } = schema.parse(body);

      const accessToken = await this.githubService.getAccessToken({
        code,
        redirectUri,
      });

      const data = await this.githubService.getUserInfoResponse(accessToken);
      this.githubService.revokeAccessToken(accessToken);
      console.log('Token revogado');

      return {
        statusCode: 200,
        body: { data },
      };
    } catch (error) {
      throw error;
    }
  }
}
