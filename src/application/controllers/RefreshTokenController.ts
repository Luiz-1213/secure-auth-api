import { z, ZodError } from 'zod';

import { InvalidRefreshToken } from '../errors/InvalidRefreshToken';
import { IController, IResponse } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { RefreshTokenUseCase } from '../useCases/RefreshTokenUseCase';

const schema = z.object({
  refreshToken: z.string().uuid(),
});

export class RefreshTokenController implements IController {
  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { refreshToken } = schema.parse(body);

      const { accessToken, refreshToken: newRefreshToken } =
        await this.refreshTokenUseCase.execute(refreshToken);

      return {
        statusCode: 200,
        body: { accessToken, refreshToken: newRefreshToken },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidRefreshToken) {
        return {
          statusCode: 401,
          body: { error: 'Invalid refresh token' },
        };
      }

      throw error;
    }
  }
}
