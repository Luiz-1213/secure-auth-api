import { hash } from 'bcryptjs';

import { IRefreshTokenRepository } from '../../domain/repositories/refreshToken/IRefreshTokenRepository';
import { IUserRepository } from '../../domain/repositories/user/IUserRepository';
import { EXP_TIME_IN_DAYS } from '../config/constants';
import { EmailAlreadyUse } from '../errors/EmailAlreadyUse';
import { TokenService } from '../services/TokenService';

interface IInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo?: string;
}

export class SignUpUseCase {
  constructor(
    private readonly usersRepo: IUserRepository,
    private readonly refreshTokenRepo: IRefreshTokenRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute({ firstName, lastName, email, password, photo }: IInput) {
    const emailAlreadyUse = await this.usersRepo.findByEmail(email);

    if (emailAlreadyUse) {
      throw new EmailAlreadyUse();
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepo.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      photo,
    });

    const accessToken = await this.tokenService.generate({
      id: user.id,
      role: user.roleId,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXP_TIME_IN_DAYS);

    const refreshToken = this.refreshTokenRepo.create({
      userId: user.id,
      expiresAt,
    });

    return { accessToken, refreshToken };
  }
}
