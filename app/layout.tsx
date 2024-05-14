import "./globals.css";
import QueryProvider from "./provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pretendard } from "@/public/fonts/fonts";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "iceCraft"
  // description: "화상 채팅 기반 게임 서비스"
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
