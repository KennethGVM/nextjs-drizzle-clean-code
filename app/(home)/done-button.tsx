'use client';

import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { updateTask } from './actions';

const DoneButton = ({ id, isDone }: { id: number; isDone: boolean }) => {
  async function _update() {
    const isConfirmed = confirm(
      '¿Estás seguro de que quieres marcar esta tarea como completada?',
    );
    if (!isConfirmed) return;
    await updateTask(id);
  }

  return (
    <Button variant="ghost" className="mr-4" onClick={_update}>
      {isDone ? (
        <Check className="text-green-500" />
      ) : (
        <X className="text-red-500" />
      )}
    </Button>
  );
};

export default DoneButton;
