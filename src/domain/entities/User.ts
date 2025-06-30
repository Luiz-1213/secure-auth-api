export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  photo: string | null;
  roleId: string;
};
