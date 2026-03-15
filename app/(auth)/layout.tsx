import { getAuthUser } from '@/lib/session';
import { redirect } from 'next/navigation';

const AuthLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const user = await getAuthUser();
  if (user) return redirect('/');

  return children;
};

export default AuthLayout;
