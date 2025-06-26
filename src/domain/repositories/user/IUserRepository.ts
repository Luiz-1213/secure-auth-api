import { User } from '../../entities/User';

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo?: string;
}

export interface IUserRepository {
  create(data: ICreateUser): Promise<User>;
  findByEmail(emails: string): Promise<User | null>;
}
