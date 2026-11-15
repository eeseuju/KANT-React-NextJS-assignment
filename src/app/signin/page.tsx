import AppCard from '@/components/AppCard';
import AppHeader from '@/components/AppHeader';
import AuthForm from '@/components/AuthForm';


export default function SigninPage() {
  return (
    <AppCard size="sm">
      <AppHeader title="로그인" />
      <div className="px-7 pb-8">
        <AuthForm mode="signin" />
      </div>
    </AppCard>
  );
}
