import axios from 'axios';

import { env } from '../config/env';
import {
  IGetAccessTokenParams,
  IOAuthService,
  IUserInfoResponse,
} from '../interfaces/IOAuthService';

interface IEmail {
  email: string;
  verified: boolean;
  primary: boolean;
}

export class GithubApiService implements IOAuthService {
  async getAccessToken({
    code,
    redirectUri,
  }: IGetAccessTokenParams): Promise<string> {
    const options = {
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    };

    const { data } = await axios.post<{ access_token: string }>(
      'https://github.com/login/oauth/access_token',
      options,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return data.access_token;
  }

  async getUserInfoResponse(accessToken: string): Promise<IUserInfoResponse> {
    const headers = {
      Authorization: `token ${accessToken}`,
    };

    // Requisição ao /user
    const { data: userData } = await axios.get('https://api.github.com/user', {
      headers,
    });

    // Requisição ao /user/emails
    const { data: emails } = await axios.get<IEmail[]>(
      'https://api.github.com/user/emails',
      {
        headers,
      },
    );

    const primaryEmail = emails.find(
      (email) => email.primary && email.verified,
    );

    const [firstName, ...rest] = userData.name?.split(' ') ?? [''];
    const lastName = rest.join(' ');

    return {
      email: primaryEmail?.email ?? '',
      verifiedEmail: primaryEmail?.verified ?? false,
      firstName,
      lastName,
      photo: userData.avatar_url,
    };
  }

  async revokeAccessToken(accessToken: string): Promise<void> {
    const basicAuth = Buffer.from(
      `${env.GITHUB_CLIENT_ID}:${env.GITHUB_CLIENT_SECRET}`,
    ).toString('base64');

    const response = await axios.delete(
      `https://api.github.com/applications/${env.GITHUB_CLIENT_ID}/token`,
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
        data: {
          access_token: accessToken,
        },
      },
    );

    console.log(response.status);
  }
}
