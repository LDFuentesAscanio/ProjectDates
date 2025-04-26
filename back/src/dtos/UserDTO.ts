export interface UserRegisterDTO {
  name: string;
  email: string;
  birthDate: Date;
  nDni: string;
  username: string;
  password: string;
}

export interface UserLoginDTO {
  username: string;
  password: string;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
}
