import { CredentialModel } from '../config/data.sourse';
import { Credential } from '../entities/Credentials.entity';

const credentialList: Credential[] = [];

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
  a: string,
  b: string
) => Promise<Credential> = async (
  username: string,
  password: string
): Promise<Credential> => {
  const passCrypt: string = await crypPass(password);

  const credentialObject = {
    username,
    password: passCrypt,
  };

  const newCredential = CredentialModel.create(credentialObject);
  return await CredentialModel.save(newCredential);
};

export const checkCredentialService = async (
  username: string,
  password: string
): Promise<number | undefined> => {
  const usernameFound: Credential | undefined = credentialList.find(
    (credential) => credential.username === username
  );
  console.log(credentialList);
  const passwordCrypt: string = await crypPass(password);
  if (!usernameFound) throw new Error(`Usuario ${username} no encontrado`);
  if (usernameFound.password !== passwordCrypt)
    throw new Error('Credenciales inválidas');
  else return usernameFound.id;
};
