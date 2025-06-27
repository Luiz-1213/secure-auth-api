import { GithubApiService } from '../application/services/GithubApiService';

export function makeGithubApiService() {
  return new GithubApiService();
}
