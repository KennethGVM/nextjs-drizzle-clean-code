import bcrypt from 'bcrypt';

//signup
export async function encrypt(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

//login
export async function compare(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
