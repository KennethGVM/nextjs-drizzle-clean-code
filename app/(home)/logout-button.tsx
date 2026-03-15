'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/lib/action';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  async function logoutUser() {
    const isConfirmed = confirm('¿Estás seguro de que quieres cerrar sesión?');
    if (!isConfirmed) return;
    await logout();
  }

  return (
    <Button variant="ghost" className="mr-4" onClick={logoutUser}>
      <LogOut className="size-6" />
    </Button>
  );
};

export default LogoutButton;
