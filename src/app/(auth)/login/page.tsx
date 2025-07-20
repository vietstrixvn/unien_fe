'use client';

import { Button, CustomImage, Input, RadiatingLoader } from '@/components';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/utils';

export default function LoginPage() {
  const { login, checkAuth } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const { username, password } = values;

    if (password.length < 8) {
      setError('password', {
        type: 'manual',
        message: 'Password must be at least 8 characters.',
      });
      return;
    }

    try {
      await login(username, password);
      await checkAuth();

      if (!useAuthStore.getState().isAuthenticated) {
        setError('root', {
          type: 'manual',
          message: 'Invalid username or password',
        });
        return;
      }

      router.push('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError('root', {
        type: 'manual',
        message: 'Login failed. Please try again.',
      });
    }
  };
  if (isSubmitting) {
    return (
      <div>
        <RadiatingLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side with illustration */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-orange-300 text-white">
        <div className="max-w-md mx-auto text-center space-y-6">
          <CustomImage
            src="/Logo.svg"
            alt="Decorative bird illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h2 className="text-2xl  lg:text-6xl font-bold ">Unien</h2>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-orange-700 mb-6">Unien</h1>
            <h2 className="text-xl text-gray-600">
              Welcome to Unein Dashboard
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="email">
                Tên đăng nhập
              </label>
              <Input
                id="username"
                placeholder="UNIEN account"
                className="w-full p-2 border rounded"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="password">
                Mật khẩu
              </label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                className="w-full p-2 border rounded"
                {...register('password')}
              />{' '}
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full font-bold text-xl bg-orange-500 hover:bg-orange-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
