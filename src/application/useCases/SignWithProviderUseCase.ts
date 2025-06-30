import { IUserRepository } from '../../domain/repositories/user/IUserRepository';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { IOAuthService } from '../interfaces/IOAuthService';
import { AuthService } from '../services/AuthService';

interface IInput {
  code: string;
  redirectUri: string;
  readonly oAuthService: IOAuthService;
}

export class SignWithProviderUseCase {
  constructor(
    private readonly usersRepo: IUserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute({ code, redirectUri, oAuthService }: IInput) {
    const oAuthAccessToken = await oAuthService.getAccessToken({
      code,
      redirectUri,
    });

    if (!oAuthAccessToken) {
      throw new InvalidCredentials();
    }

    const { email, firstName, lastName, photo, verifiedEmail } =
      await oAuthService.getUserInfoResponse(oAuthAccessToken);

    if (!verifiedEmail) {
      throw new InvalidCredentials();
    }

    await oAuthService.revokeAccessToken(oAuthAccessToken);

    const user = await this.usersRepo.createOrUpdate({
      email,
      firstName,
      lastName,
      photo,
      password: null,
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
