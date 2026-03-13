import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

type Session = {
  id?: number;
  email?: string;
};

export async function getSession() {
  const cookieStore = await cookies();

  const session = await getIronSession<Session>(cookieStore, {
    password: process.env.SESSION_SECRET!,
    cookieName: process.env.SESSION_NAME!,
  });

  return session;
}

export async function setSession(data: Session) {
  const session = await getSession();

  session.id = data.id;
  session.email = data.email;

  await session.save();
}
