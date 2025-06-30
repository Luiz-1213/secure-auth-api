import { SignWithGithubController } from '../application/controllers/SignWithGithubController';

import { makeGithubApiService } from './makeGitHubApiService';
import { makeSignWithProviderUseCase } from './makeSignWithProviderUseCase';

export function makeSignWithGithubController() {
  const githubService = makeGithubApiService();
  const signWithProviderUseCase = makeSignWithProviderUseCase();
  return new SignWithGithubController(githubService, signWithProviderUseCase);
}
