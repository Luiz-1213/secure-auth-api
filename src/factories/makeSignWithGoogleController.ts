import { SignWithGoogleController } from '../application/controllers/SignWithGoogleController';

import { makeGoogleApiService } from './makeGoogleApiService';
import { makeSignWithProviderUseCase } from './makeSignWithProviderUseCase';

export function makeSignWithGoogleController() {
  const googleService = makeGoogleApiService();
  const signWithProviderUseCase = makeSignWithProviderUseCase();
  return new SignWithGoogleController(googleService, signWithProviderUseCase);
}
