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
import { signupSchema } from '@/lib/schemas/signup.schema';
import { FileUpload } from '@/components/ui/file-upload';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/services/auth.service';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@/hooks/useUser';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

export default function SignupForm() {
  const router = useNavigate();
  const { setEmail, setIsTestUser } = useUser();

  const form = useForm<z.infer<typeof signupSchema>>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      profileImage: '',
      isTestUser: false,
    },
    resolver: zodResolver(signupSchema),
  });

  const { mutateAsync: signupFn, isPending: isSignupLoading } = useMutation({
    mutationFn: async (payload: ISignupType) => await signup(payload),
    onSuccess: (data, payload) => {
      toast.success(data?.message);
      setEmail(data?.user.email);
      setIsTestUser(payload.isTestUser);
      form.reset();
      router('/sign?type=in');
    },
    onError: (err: { response: { data: { message: string } } }) => {
      console.log(err);
      toast.error(
        err?.response?.data?.message || '알 수 없는 에러가 발생하였습니다.',
      );
    },
  });

  const submitHandler = async (values: z.infer<typeof signupSchema>) => {
    const data = await signupFn(values);
    console.log(data);
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} disabled={isSignupLoading} />
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
                  <Input type="text" {...field} disabled={isSignupLoading} />
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
                    disabled={isSignupLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end justify-between">
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
            <FormField
              control={form.control}
              name="isTestUser"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="default-user">Default User</Label>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="test-user">Test User</Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 flex w-full items-center justify-between">
            <Link to="/sign?type=in">
              이미 회원이신가요?
              <br />
              <span className="font-semibold text-indigo-400">로그인</span>
              으로 이동하기
            </Link>
            <Button
              variant="outline"
              className="bg-indigo-400 text-white"
              disabled={isSignupLoading}
            >
              {isSignupLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                '회원가입'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
