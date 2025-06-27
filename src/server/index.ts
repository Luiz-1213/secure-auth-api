import express from 'express';

import { makeSignInController } from '../factories/makeSignInController';
import { makeSignUpController } from '../factories/makeSignUpController';

import { routeAdapter } from './adapters/routeAdapter';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
