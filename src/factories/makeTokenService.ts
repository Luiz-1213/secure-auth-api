import { TokenService } from '../application/services/TokenService';

export function makeTokenService() {
  return new TokenService();
}
