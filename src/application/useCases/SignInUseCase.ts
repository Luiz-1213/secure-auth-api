import { compare } from 'bcryptjs';

import { IUserRepository } from '../../domain/repositories/user/IUserRepository';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { AuthService } from '../services/AuthService';

interface IInput {
  email: string;
  password: string;
}

export class SignInUseCase {
  constructor(
    private readonly usersRepo: IUserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute({ email, password }: IInput) {
    const user = await this.usersRepo.findByEmail(email);

    if (!user || !user.password) {
      throw new InvalidCredentials();
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new InvalidCredentials();
    }

    const { accessToken, refreshToken } = await this.authService.generateTokens(
      {
        userId: user.id,
        roleId: user.roleId,
      },
    );

    return { accessToken, refreshToken };
  }
}
