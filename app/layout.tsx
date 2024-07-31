import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pretendard } from "@/public/fonts/fonts";
import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "IceCraft",
  description: "into stunning space! 놀라운 공간 속으로!",
  keywords: ["IceCraft", "icecraft", "아이스 크레프트"],
  creator: "IC company",
  openGraph: {
    title: "IceCraft",
    description: "into stunning space! 놀라운 공간 속으로!",
    images: [
      {
        url: "/app/favicon.ico",
        width: 500,
        height: 400,
        alt: "IceCraft Favicon"
      }
    ],
    //FIXME - url: "메인페이지URL",
    siteName: "IceCraft",
    locale: "ko_KR",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <ToastContainer position="top-left" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
