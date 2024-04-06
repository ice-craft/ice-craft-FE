"use client";

import "./globals.css";
import QueryProvider from "./provider";
import { ToastContainer } from "react-toastify";
import Header from "./_components/layout/Header";
import Footer from "./_components/layout/Footer";
import { usePathname } from "next/navigation";
import { metadata } from "@/metadata";
import Head from "next/head";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showHeaderAndFooter = pathname !== "/";

  return (
    <html lang="ko">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body>
        <ToastContainer />
        {showHeaderAndFooter && <Header />}
        <QueryProvider>{children}</QueryProvider>
        {showHeaderAndFooter && <Footer />}
      </body>
    </html>
  );
}
