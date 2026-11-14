import AuthForm from '@/components/AuthForm';

export default function SigninPage() {
  return (
    <main className="mx-auto max-w-sm space-y-4 p-6">
      <h1 className="text-2xl font-bold">로그인</h1>
      <AuthForm mode="signin" />
    </main>
  );
}