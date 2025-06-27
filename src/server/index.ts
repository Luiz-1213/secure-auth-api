import express, { NextFunction, Response } from 'express';

import { makeSignInController } from '../factories/makeSignInController';
import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignWithGithubController } from '../factories/makeSignWithGithubController';

import { routeAdapter } from './adapters/routeAdapter';

const app = express();
const port = process.env.PORT ?? 3000;

const cors = (request, response: Response, next: NextFunction) => {
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
app.post('/auth/google', routeAdapter(makeSignInController()));
app.post('/auth/github', routeAdapter(makeSignWithGithubController()));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
