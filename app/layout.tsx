import "./globals.css";
import QueryProvider from "./provider";
import { ToastContainer } from "react-toastify";
import Header from "./_components/layout/Header";
import Footer from "./_components/layout/Footer";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "iceCraft",
  description: "화상 채팅 기반 게임 서비스"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ToastContainer />
        <Header />
        <QueryProvider>{children}</QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
