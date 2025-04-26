import { UserDTO, UserRegisterDTO } from '../dtos/UserDTO';
import { IUser } from '../Interfaces/UserInterface';
import { createCredentialService } from './credentialServices';

const userList: IUser[] = [];
let id: number = 1;

export const getUserService = (): UserDTO[] => {
  return userList.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });
};

export const getUserByIdService = (id: string): UserDTO => {
  const userFound: IUser | undefined = userList.find(
    (user) => user.id === parseInt(id, 10)
  );
  if (!userFound) throw new Error(`El usuario con id ${id} no existe`);
  else
    return {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
    };
};

export const registerUserService = async (
  user: UserRegisterDTO
): Promise<IUser> => {
  const idCredentialsUser: number = await createCredentialService(
    user.username,
    user.password
  );

  const userObject: IUser = {
    id: id++,
    name: user.name,
    birthDate: user.birthDate,
    email: user.email,
    nDni: user.nDni,
    credentialsId: idCredentialsUser,
  };
  userList.push(userObject);
  return userObject;
};
