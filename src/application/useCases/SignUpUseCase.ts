import { hash } from 'bcryptjs';

import { IUserRepository } from '../../domain/repositories/user/IUserRepository';
import { EmailAlreadyUse } from '../errors/EmailAlreadyUse';
import { AuthService } from '../services/AuthService';

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
    private readonly authService: AuthService,
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

    const { accessToken, refreshToken } = await this.authService.generateTokens(
      {
        userId: user.id,
        roleId: user.roleId,
      },
    );

    return { accessToken, refreshToken };
  }
}
