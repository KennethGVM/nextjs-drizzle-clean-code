'use server';

import { db } from '@/lib/db';
import { getAuthUser, setSession } from '@/lib/session';
import { compare } from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function login(formData: FormData) {
  const user = await getAuthUser();

  if (user)
    return {
      error: 'Ya tienes una sesión activa',
    };

  const rawForData = Object.fromEntries(formData.entries());
  const parsedData = loginSchema.safeParse(rawForData);

  if (!parsedData.success)
    return {
      error: 'Datos inválidos',
    };

  const userExists = await db.query.users.findFirst({
    where: (u, { eq }) =>
      eq(u.email, parsedData.data.email.toLocaleLowerCase()),
  });

  if (!userExists)
    return {
      error: 'Usuario no encontrado',
    };

  const passwordIsMatch = await compare(
    parsedData.data.password,
    userExists.password,
  );

  if (!passwordIsMatch)
    return {
      error: 'Contraseña incorrecta',
    };

  await setSession({
    id: userExists.id,
    email: userExists.email,
  });

  return redirect('/');
}
