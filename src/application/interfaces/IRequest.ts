export interface IRequest {
  headers: Record<string, string>;
  body: Record<string, any>;
  params: Record<string, string>;
  user?: {
    id: string;
    role: string;
  };
}
