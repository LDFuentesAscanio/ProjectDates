export interface UserRegisterDTO {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface UserLoginDTO {
  username: string;
  password: string;
}
