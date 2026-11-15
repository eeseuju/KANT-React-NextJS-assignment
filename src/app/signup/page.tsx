// [서버 컴포넌트] 카드 틀은 서버에서 미리 그려 바로 보여 주고, 입력·버튼은 AuthForm(클라이언트)만 맡는다.
import AppCard from '@/components/AppCard';
import AppHeader from '@/components/AppHeader';
import AuthForm from '@/components/AuthForm';


export default function SignupPage() {
  return (
    <AppCard size="sm">
      <AppHeader title="회원가입" />
      <div className="px-7 pb-8">
        <AuthForm mode="signup" />
      </div>
    </AppCard>
  );
}
