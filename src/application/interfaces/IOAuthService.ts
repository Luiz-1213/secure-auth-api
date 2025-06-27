export interface IGetAccessTokenParams {
  code: string;
  redirectUri: string;
}

export interface IUserInfoResponse {
  email: string;
  verifiedEmail: boolean;
  firstName: string;
  lastName: string;
  photo: string;
}

export interface IOAuthService {
  getAccessToken({ code, redirectUri }: IGetAccessTokenParams): Promise<string>;
  getUserInfoResponse(accessToken: string): Promise<IUserInfoResponse>;
  revokeAccessToken(accessToken: string): void;
}
