import z from 'zod';

const schema = z.string();
const result = schema.safeParse(process.env.JWT_SECRET);

if (result.error) {
  throw new Error('JWT secret is required!');
}

export const env = {
  jwtSecret: process.env.JWT_SECRET!,
};
