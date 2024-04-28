'use client';

import { Link, useNavigate } from 'react-router-dom';
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
import { useMutation } from '@tanstack/react-query';
import { signin } from '@/services/auth.service';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function SigninForm() {
  const router = useNavigate();

  const form = useForm<z.infer<typeof signinSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signinSchema),
  });

  const { mutateAsync: signinFn, isPending: isSigninLoading } = useMutation({
    mutationFn: async (payload: ISigninType) => await signin(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      form.reset();
      router('/');
    },
    onError: (err: { response: { data: { message: string } } }) => {
      console.log(err);
      toast.error(
        err?.response?.data?.message || '알 수 없는 에러가 발생하였습니다.',
      );
    },
  });

  const submitHandler = async (values: z.infer<typeof signinSchema>) => {
    const data = await signinFn(values);
    console.log(data);
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
                  <Input type="text" {...field} disabled={isSigninLoading} />
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
                  <Input
                    type="password"
                    {...field}
                    disabled={isSigninLoading}
                  />
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
            <Button
              variant="outline"
              className="bg-indigo-400 text-white"
              disabled={isSigninLoading}
            >
              {isSigninLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                '로그인'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
