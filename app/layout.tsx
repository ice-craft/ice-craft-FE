import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pretendard } from "@/public/fonts/fonts";
import type { Metadata } from "next";
import GoogleTracker from "@/utils/GoogleTracker";

const defaultUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : "http://localhost:3000";

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
        url: "https://ktfrmyssyzqmoljohixh.supabase.co/storage/v1/object/public/images/open_%20graph.jpg",
        width: 1200,
        height: 630,
        alt: "IceCraft"
      }
    ],

    url: "https://www.icecraft.co.kr",
    siteName: "IceCraft",
    locale: "ko_KR",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <GoogleTracker />
        <ToastContainer position="top-left" /> {children}
      </body>
    </html>
  );
}
