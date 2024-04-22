import SignUi from '@/components/sign/sign-ui';
import SigninForm from '@/components/sign/signin-form';
import SignupForm from '@/components/sign/signup-form';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SignPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  useEffect(() => {
    if (!type) {
      setSearchParams({ type: 'in' });
    }
  }, [type]);

  return (
    <section className="min-h-screen">
      <div className="mx-auto flex h-full w-full flex-col justify-center lg:h-screen lg:!flex-row">
        {type === 'up' ? <SignupForm /> : <SigninForm />}
        <div
          className="relative flex h-full w-full flex-col justify-center bg-indigo-600 bg-cover bg-center bg-no-repeat px-2 py-40 sm:px-12 sm:py-48 lg:w-1/2"
          style={{
            backgroundImage: 'url(https://cdn.tuk.dev/assets/Image.jpg)',
          }}
        >
          <SignUi />
        </div>
      </div>
    </section>
  );
}
