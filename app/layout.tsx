import "./globals.css";
import QueryProvider from "./provider";
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
      <head>
        <meta charSet="utf-8" />
        <meta property="og:title" content="Ice Craft" />
        <meta property="og:description" content="into stunning space! 놀라운 공간 속으로!" />
        {/* //NOTE - URL<meta property="og:url" content="" /> */}
        <meta property="og:type" content="game" />
        {/* //NOTE - 대표이미지<meta property="og:image" content="" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ToastContainer position="top-left" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
