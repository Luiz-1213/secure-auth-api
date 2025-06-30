import express, { NextFunction, Request, Response } from 'express';

import { makeRefreshTokenController } from '../factories/makeRefreshTokenController';
import { makeSignInController } from '../factories/makeSignInController';
import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignWithGithubController } from '../factories/makeSignWithGithubController';
import { makeSignWithGoogleController } from '../factories/makeSignWithGoogleController';

import { routeAdapter } from './adapters/routeAdapter';

const app = express();
const port = process.env.PORT ?? 3000;

const cors = (request: Request, response: Response, next: NextFunction) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Max-Age', '10');

  next();
};

app.use(express.json());

app.use(cors);

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));
app.post('/revoke', routeAdapter(makeSignInController()));
app.post('/refresh-token', routeAdapter(makeRefreshTokenController()));
app.post('/auth/google', routeAdapter(makeSignWithGoogleController()));
app.post('/auth/github', routeAdapter(makeSignWithGithubController()));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
