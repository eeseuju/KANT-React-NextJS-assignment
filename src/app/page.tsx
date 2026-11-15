// [서버 컴포넌트] 화면이 없고 /todo로 이동만 시킨다. (브라우저 JS 불필요)
import { redirect } from 'next/navigation';


export default function Home() {
  redirect('/todo');
}