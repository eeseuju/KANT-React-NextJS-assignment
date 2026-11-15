import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Todo',
  description: 'Next.js와 Supabase로 만든 할 일 목록',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <head>
        {/* 아이콘 글꼴 (Material Symbols). display=block: 글꼴이 오기 전에는 아이콘 이름 글자를 숨긴다.
            Next.js 경고 2개는 의도한 설정이라 이 줄에서만 끈다: 아이콘 글꼴은 next/font에 없고(구글 스타일시트로 불러옴),
            글자 모양(이름)이 깜빡이는 것을 막으려고 block을 쓴다. */}
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=block"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
