import { UserModel } from '../config/data.sourse';
import { UserDTO, UserRegisterDTO } from '../dtos/UserDTO';
import { Credential } from '../entities/Credentials.entity';
import { User } from '../entities/User.entity';
import { createCredentialService } from './credentialServices';

export const getUserService = async (): Promise<UserDTO[]> => {
  const users: User[] = await UserModel.find();
  return users;
};

export const getUserByIdService = async (id: string): Promise<UserDTO> => {
  const userFound = await UserModel.findOne({
    where: { id: parseInt(id, 10) },
    relations: ['credentials'],
  });
  if (!userFound) throw new Error(`El usuario con id ${id} no existe`);
  else return userFound;
};

export const registerUserService = async (
  user: UserRegisterDTO
): Promise<User> => {
  const idCredentialsUser: Credential = await createCredentialService(
    user.username,
    user.password
  );
  const userObject = {
    name: user.name,
    birthdate: user.birthdate,
    email: user.email,
    nDni: user.nDni,
    credentials: idCredentialsUser,
  };
  const newUser = UserModel.create(userObject);
  return await UserModel.save(newUser);
};
