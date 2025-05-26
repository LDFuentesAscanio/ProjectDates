import { AppDataSource, UserModel } from '../config/data.sourse';
import {
  UserDTO,
  UserLoginDTO,
  UserLoginSuccessDTO,
  UserRegisterDTO,
} from '../dtos/UserDTO';
import { User } from '../entities/User.entity';
import { CustomError } from '../utils/customErrors';
import {
  checkCredentialService,
  createCredentialService,
} from './credentialServices';

export const getUserService = async (): Promise<UserDTO[]> => {
  const users: User[] = await UserModel.find();
  return users;
};

export const getUserByIdService = async (id: string): Promise<UserDTO> => {
  const userFound = await UserModel.findOne({
    where: { id: parseInt(id, 10) },
    relations: ['appointments'],
  });
  if (!userFound)
    throw new CustomError(404, `El usuario con id ${id} no existe`);
  else return userFound;
};

export const registerUserService = async (
  user: UserRegisterDTO
): Promise<User> => {
  const result = await AppDataSource.transaction(async (entityManager) => {
    const userCredentials = await createCredentialService(
      entityManager,
      user.username,
      user.password
    );
    const newUser: User = entityManager.create(User, {
      name: user.name,
      birthdate: user.birthdate,
      email: user.email,
      nDni: user.nDni,
      credentials: userCredentials,
    });
    return await entityManager.save(newUser);
  });
  return result;
};

export const loginUserService = async (
  user: UserLoginDTO
): Promise<UserLoginSuccessDTO> => {
  const credentialId: number | undefined = await checkCredentialService(
    user.username,
    user.password
  );
  const userFound: User | null = await UserModel.findOne({
    where: {
      credentials: {
        id: credentialId,
      },
    },
  });
  return {
    login: true,
    user: {
      id: userFound?.id ?? 0,
      name: userFound?.name ?? '',
      email: userFound?.email ?? '',
      birthdate: userFound?.birthdate ?? new Date(),
      nDni: userFound?.nDni ?? 0,
    },
  };
};
