import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { PrismaUserRepository } from '../../domain/repositories/user/PrismaUserRepository';
import { env } from '../config/env';
import { EmailAlreadyUse } from '../errors/EmailAlreadyUse';

interface IInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo?: string;
}

export class SignUpUseCase {
  constructor(private readonly usersRepo: PrismaUserRepository) {}

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

    const accessToken = sign(
      {
        sub: user.id,
        role: user.roleId,
      },
      env.jwtSecret,
      { expiresIn: '1d' },
    );

    return { accessToken };
  }
}
