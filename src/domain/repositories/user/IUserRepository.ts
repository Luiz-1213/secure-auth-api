import { User } from '../../entities/User';

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  photo?: string;
}

export interface IUserRepository {
  create(data: ICreateUser): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  createOrUpdate(data: ICreateUser): Promise<User>;
}
