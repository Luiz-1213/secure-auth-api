import axios from 'axios';
import qs from 'qs';

import { env } from '../config/env';
import {
  IGetAccessTokenParams,
  IOAuthService,
  IUserInfoResponse,
} from '../interfaces/IOAuthService';

export class GoogleApiService implements IOAuthService {
  async getAccessToken({
    code,
    redirectUri,
  }: IGetAccessTokenParams): Promise<string> {
    const options = qs.stringify({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    });

    const { data } = await axios.post<{ access_token: string }>(
      'https://oauth2.googleapis.com/token',
      options,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return data.access_token;
  }

  async getUserInfoResponse(accessToken: string): Promise<IUserInfoResponse> {
    const { data } = await axios.get(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return {
      email: data.email,
      verifiedEmail: data.verified_email,
      firstName: data.given_name,
      lastName: data.family_name,
      photo: data.picture,
    };
  }

  async revokeAccessToken(accessToken: string): Promise<void> {
    await axios.post(
      'https://oauth2.googleapis.com/revoke',
      qs.stringify({ token: accessToken }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}
