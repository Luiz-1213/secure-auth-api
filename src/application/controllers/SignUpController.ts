import { z, ZodError } from 'zod';

import { EmailAlreadyUse } from '../errors/EmailAlreadyUse';
import { IController, IResponse } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { SignUpUseCase } from '../useCases/SignUpUseCase';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  photo: z.string().url().optional(),
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, firstName, lastName, password, photo } =
        schema.parse(body);

      const { accessToken, refreshToken } = await this.signUpUseCase.execute({
        email,
        firstName,
        lastName,
        password,
        photo,
      });

      return {
        statusCode: 201,
        body: { accessToken, refreshToken },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof EmailAlreadyUse) {
        return {
          statusCode: 409,
          body: { error: 'This email is already in use' },
        };
      }

      throw error;
    }
  }
}
