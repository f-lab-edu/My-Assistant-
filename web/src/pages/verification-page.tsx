import { useUser } from '@/hooks/useUser';
import { verifyToken } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function VerificationPage() {
  const router = useNavigate();
  const [searchParams, _setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  console.log(email);

  const { isTestUser } = useUser();

  const { mutate: verifyTokenFn } = useMutation({
    mutationFn: ({ token, email }: { token: string; email: string }) =>
      verifyToken({ token, isTestUser, email }),
  });

  useEffect(() => {
    if (!token) {
      toast.error('유효하지 않은 토큰입니다.');
      router('/sign?type=up');
    } else if (!email) {
      toast.error('유효하지 않은 이메일입니다.');
      router('/sign?type=up');
    } else {
      verifyTokenFn({ token, email });
      router('/sign?type=in');
    }
  }, [token, email]);

  return <div />;
}
