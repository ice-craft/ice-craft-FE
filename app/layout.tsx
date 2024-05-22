import "./globals.css";
import QueryProvider from "./provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pretendard } from "@/public/fonts/fonts";
import 

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "IceCraft",
  description: "into stunning space! 놀라운 공간 속으로!",
  keywords: ["IceCraft", "icecraft", "아이스 크레프트"],
  creator: "IC company",
  openGraph: {
    title: "IceCraft",
    description: "into stunning space! 놀라운 공간 속으로!",
    image: [
      {
        url: "../app/favicon.ico",
        width: 500,
        height: 400
      }
    ],
    url: "",
    siteName: "IceCraft",
    locale: "ko_KR",
    type: "website"
  }
  // description: "화상 채팅 기반 게임 서비스"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.className}>
      <head></head>
      <body>
        <ToastContainer position="top-left" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
