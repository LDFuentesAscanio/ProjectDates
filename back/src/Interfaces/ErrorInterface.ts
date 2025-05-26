export interface IPostgresError {
  detail?: string;
  code: number;
  message: string;
}
