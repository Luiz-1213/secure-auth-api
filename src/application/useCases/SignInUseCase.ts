import { compare } from 'bcryptjs';

import { IRefreshTokenRepository } from '../../domain/repositories/refreshToken/IRefreshTokenRepository';
import { IUserRepository } from '../../domain/repositories/user/IUserRepository';
import { EXP_TIME_IN_DAYS } from '../config/constants';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { TokenService } from '../services/TokenService';

interface IInput {
  email: string;
  password: string;
}

export class SignInUseCase {
  constructor(
    private readonly usersRepo: IUserRepository,
    private readonly refreshTokenRepo: IRefreshTokenRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute({ email, password }: IInput) {
    const user = await this.usersRepo.findByEmail(email);

    if (!user) {
      throw new InvalidCredentials();
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new InvalidCredentials();
    }

    const accessToken = await this.tokenService.generate({
      id: user.id,
      role: user.roleId,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXP_TIME_IN_DAYS);

    const { id } = await this.refreshTokenRepo.create({
      userId: user.id,
      expiresAt,
    });

    return { accessToken, refreshToken: id };
  }
}
