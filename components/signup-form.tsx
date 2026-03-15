'use client';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import SubmitButton from '@/app/(auth)/signup/submit-button';
import { signup } from '@/app/(auth)/signup/actions';

export function SingUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  async function action(formData: FormData) {
    const res = await signup(formData);

    if (res.error) {
      alert(res.error);
    }
  }
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Crea tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tus datos para crear tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Nombre</FieldLabel>
                <Input id="name" placeholder="jhon doe." required name="name" />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  name="password"
                />
              </Field>
              <Field>
                <SubmitButton />
                <p className="text-right">
                  Ya tienes una cuenta?{' '}
                  <Link className="text-blue-500 underline" href="/signup">
                    Inicia sesión
                  </Link>
                </p>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
