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
import { signupSchema } from '@/lib/schemas/signup.schema';
import { FileUpload } from '@/components/ui/file-upload';

export default function SignupForm() {
  const form = useForm<z.infer<typeof signupSchema>>({
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      profileImage: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const submitHandler = async (values: z.infer<typeof signupSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
      <h1 className="mb-6 text-3xl font-bold">ChatLink</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex w-full flex-col gap-4 sm:w-[60%]"
        >
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Nickname</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">
                  ProfileImage
                </FormLabel>
                <FormControl>
                  <FileUpload field={field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-4 flex w-full items-center justify-between">
            <Link to="/sign?type=in">
              이미 회원이신가요?
              <br />
              <span className="font-semibold text-indigo-400">로그인</span>
              으로 이동하기
            </Link>
            <Button variant="outline" className="bg-indigo-400 text-white">
              회원가입
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
