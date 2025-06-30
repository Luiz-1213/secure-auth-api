import { z, ZodError } from 'zod';

import { InvalidCredentials } from '../errors/InvalidCredentials';
import { IController, IResponse } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { GoogleApiService } from '../services/GoogleApiService';
import { SignWithProviderUseCase } from '../useCases/SignWithProviderUseCase';

const schema = z.object({
  code: z.string(),
  redirectUri: z.string().url(),
});

export class SignWithGoogleController implements IController {
  constructor(
    private readonly googleService: GoogleApiService,
    private readonly signWithProviderUseCase: SignWithProviderUseCase,
  ) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { code, redirectUri } = schema.parse(body);

      const { accessToken, refreshToken } =
        await this.signWithProviderUseCase.execute({
          code,
          redirectUri,
          oAuthService: this.googleService,
        });

      return {
        statusCode: 200,
        body: { accessToken, refreshToken },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: { error: 'Invalid Credentials' },
        };
      }
      throw error;
    }
  }
}
