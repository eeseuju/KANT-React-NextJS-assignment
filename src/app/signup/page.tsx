import AuthForm from '@/components/AuthForm';

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-sm space-y-4 p-6">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <AuthForm mode="signup" />
    </main>
  );
}