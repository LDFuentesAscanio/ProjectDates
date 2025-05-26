import { EntityManager } from 'typeorm';
import { Credential } from '../entities/Credentials.entity';
import { CredentialModel } from '../config/data.sourse';
import { CustomError } from '../utils/customErrors';

const crypPass = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hasArray = Array.from(new Uint8Array(hash));
  const passCrypt = hasArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return passCrypt;
};

export const createCredentialService: (
  entityManager: EntityManager,
  a: string,
  b: string
) => Promise<Credential> = async (
  entityManager: EntityManager,
  username: string,
  password: string
): Promise<Credential> => {
  const passCrypt: string = await crypPass(password);
  const credentials: Credential = entityManager.create(Credential, {
    username,
    password: passCrypt,
  });

  return await entityManager.save(credentials);
};

export const checkCredentialService = async (
  username: string,
  password: string
): Promise<number | undefined> => {
  const usernameFound: Credential | null = await CredentialModel.findOne({
    where: { username: username },
  });
  const passwordCrypt: string = await crypPass(password);
  if (!usernameFound)
    throw new CustomError(400, `Usuario ${username} no encontrado`);
  if (usernameFound.password !== passwordCrypt)
    throw new CustomError(400, 'Credenciales inválidas');
  else return usernameFound.id;
};
