'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormStatus } from 'react-dom';
import { saveTask } from './actions';

const SaveForm = () => {
  async function action(formData: FormData) {
    const res = await saveTask(formData);

    if (res?.error) {
      alert(res.error);
    }
  }

  return (
    <form className="space-y-4 pb-4" action={action}>
      <div className="flex items-center gap-2">
        <label htmlFor="name">Titulo</label>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="flex-1 border rounded px-2 py-1"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="description">Descripcion</label>
        <textarea
          name="description"
          id="description"
          className="flex-1 border rounded px-2 py-1"
        ></textarea>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox name="isDone" id="isDone" />
        <label htmlFor="isDone">Completado</label>
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
};

export default SaveForm;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Enviando...' : 'Guardar'}
    </Button>
  );
}
