'use server';

import { db } from '@/lib/db';
import { tasks } from '@/lib/db/schema';
import { getAuthUser } from '@/lib/session';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const saveTaskSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  isDone: z.boolean(),
});

export async function saveTask(formData: FormData) {
  const user = await getAuthUser();
  if (!user) {
    return {
      error: 'Debes iniciar sesión para crear una tarea.',
    };
  }

  const rawFormData = {
    ...Object.fromEntries(formData.entries()),
    isDone: formData.get('isDone') === 'on',
  };

  const parseData = saveTaskSchema.safeParse(rawFormData);
  if (!parseData.success) {
    return {
      error: 'Los datos ingresados no son válidos.',
    };
  }

  await db.insert(tasks).values({
    ...parseData.data,
    userId: user.id,
  });

  revalidatePath('/');
}

export async function deleteTask(taskId: number) {
  const user = await getAuthUser();
  if (!user) {
    return {
      error: 'Debes iniciar sesión para eliminar una tarea.',
    };
  }
  const userIsOwner = await db.query.tasks.findFirst({
    where: (t, { and, eq }) => and(eq(t.id, taskId), eq(t.userId, user.id)),
  });

  if (!userIsOwner) {
    return {
      error: 'No tienes permisos para eliminar esta tarea.',
    };
  }
  await db.delete(tasks).where(eq(tasks.id, taskId));

  revalidatePath('/');
}

export async function updateTask(taskId: number) {
  const user = await getAuthUser();
  if (!user) {
    return {
      error: 'Debes iniciar sesión para actualizar una tarea.',
    };
  }

  const userIsOwner = await db.query.tasks.findFirst({
    where: (t, { and, eq }) => and(eq(t.id, taskId), eq(t.userId, user.id)),
  });

  if (!userIsOwner) {
    return {
      error: 'No tienes permisos para actualizar esta tarea.',
    };
  }

  await db
    .update(tasks)
    .set({
      isDone: !userIsOwner.isDone,
    })
    .where(eq(tasks.id, taskId));

  revalidatePath('/');
}
