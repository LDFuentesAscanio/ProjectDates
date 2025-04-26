import { ICredential } from '../Interfaces/CredentialInterface';

const credentialList: ICredential[] = [];
let id = 1;

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
) => Promise<number> = async (
  username: string,
  password: string
): Promise<number> => {
  const passCrypt: string = await crypPass(password);

  const credentialObject: ICredential = {
    id,
    username,
    password: passCrypt,
  };
  credentialList.push(credentialObject);
  return id++;
};

export const checkCredentialService = async (
  username: string,
  password: string
): Promise<number | undefined> => {
  const usernameFound: ICredential | undefined = credentialList.find(
    (credential) => credential.username === username
  );
  console.log(credentialList);
  const passwordCrypt: string = await crypPass(password);
  if (!usernameFound) throw new Error(`Usuario ${username} no encontrado`);
  if (usernameFound.password !== passwordCrypt)
    throw new Error('Credenciales inválidas');
  else return usernameFound.id;
};
