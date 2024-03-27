import { GeistSans } from 'geist/font/sans';
import './globals.css';
import QueryProvider from './provider';
import { ToastContainer } from 'react-toastify';

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'FiveDotSix',
  description: '화상 채팅 기반으로한 게임 서비스'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={GeistSans.className}>
      <body>
        <main>
          <ToastContainer />
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  );
}
