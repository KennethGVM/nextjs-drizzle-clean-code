'use client';
import { Button } from '@/components/ui/button';
import { deleteTask } from './actions';
import { Trash } from 'lucide-react';

const DeleteButton = ({ id }: { id: number }) => {
  async function _delete() {
    const isConfirmed = confirm(
      '¿Estás seguro de que quieres eliminar esta tarea?',
    );
    if (!isConfirmed) return;
    await deleteTask(id);
  }

  return (
    <Button variant={'destructive'} className="text-sm" onClick={_delete}>
      <Trash className="w-4 h-4" />
    </Button>
  );
};

export default DeleteButton;
