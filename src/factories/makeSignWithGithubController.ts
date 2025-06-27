import { SignWithGithubController } from '../application/controllers/SignWithGithubController';

import { makeGithubApiService } from './makeGitHubApiService';

export function makeSignWithGithubController() {
  const githubService = makeGithubApiService();
  return new SignWithGithubController(githubService);
}
