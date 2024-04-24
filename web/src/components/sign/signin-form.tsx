'use client';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signinSchema } from '@/lib/schemas/signin.schema';

export default function SigninForm() {
  const form = useForm<z.infer<typeof signinSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signinSchema),
  });

  const submitHandler = async (values: z.infer<typeof signinSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 lg:w-1/2">
      <h1 className="mb-6 text-3xl font-bold">MyNote</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex w-full flex-col gap-4 sm:w-[60%]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Password</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex w-full items-center justify-between">
            <Link to="/sign?type=up">
              아직 회원이 아니신가요?
              <br />
              <span className="font-semibold text-indigo-400">회원가입</span>
              으로 이동하기
            </Link>
            <Button variant="outline" className="bg-indigo-400 text-white">
              로그인
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
