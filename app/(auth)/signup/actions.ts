'use server';
import { encrypt } from '@/lib/crypt';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { getAuthUser, setSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signup(formData: FormData) {
  const user = await getAuthUser();

  if (user)
    return {
      error: 'Ya tienes una cuenta',
    };

  const rawForData = Object.fromEntries(formData.entries());

  const parsedData = signupSchema.safeParse(rawForData);

  if (!parsedData.success)
    return {
      error: 'Datos inválidos',
    };
  const passwordHash = await encrypt(parsedData.data.password);

  const createUser = await db
    .insert(users)
    .values({
      name: parsedData.data.name,
      email: parsedData.data.email.toLocaleLowerCase(),
      password: passwordHash,
    })
    .returning();

  await setSession({
    id: createUser[0].id,
    email: parsedData.data.email,
  });

  return redirect('/');
}
