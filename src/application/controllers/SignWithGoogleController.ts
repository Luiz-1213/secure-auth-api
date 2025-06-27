import { z } from 'zod';

import { IController, IResponse } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { SignWithGoogleUseCase } from '../useCases/SignWithGoogleUseCase';

const schema = z.object({
  code: z.string(),
  redirectUri: z.string().url(),
});

export class SignWithGoogleController implements IController {
  constructor(private readonly signWithGoogleCase: SignWithGoogleUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      return {
        statusCode: 200,
        body: {},
      };
    } catch (error) {
      throw error;
    }
  }
}
