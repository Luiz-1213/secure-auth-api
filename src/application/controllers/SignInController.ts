import { z, ZodError } from 'zod';

import { InvalidCredentials } from '../errors/InvalidCredentials';
import { IController, IResponse } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { SignInUseCase } from '../useCases/SignInUseCase';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);

      const { accessToken, refreshToken } = await this.signInUseCase.execute({
        email,
        password,
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
