import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { env } from '../config/env';

interface IGenerateData {
  id: string;
  role: string;
}

export class TokenService {
  async generate({ id, role }: IGenerateData): Promise<string> {
    return sign(
      {
        sub: id,
        role,
      },
      env.JWT_SECRET,
      { expiresIn: '1d' },
    );
  }

  async validate(token: string) {
    try {
      const payload = verify(token, env.JWT_SECRET) as JwtPayload;

      return { payload };
    } catch (error) {
      return {
        statusCode: 401,
        body: { error: 'Invalid access token' },
      };
    }
  }
}
