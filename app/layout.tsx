import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Re-Hub | 회생·파산관재인 채권 시부인 관리 플랫폼',
  description: 'AI 신고서 파싱, 3-Way 시부인 대시보드, 회생법원 표준 Excel 명세서(별표 2-2) 자동 생성 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
