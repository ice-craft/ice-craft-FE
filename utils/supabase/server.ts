import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// Next.js에서 Supabase에 액세스하려면 두 가지 유형의 Supabase 클라이언트가 필요
// 클라이언트 구성 요소 - 브라우저에서 실행되는 클라이언트 구성 요소에서 Supabase에 액세스한다.
// 서버 구성 요소  - 서버에서만 실행되는 서버 구성 요소, 서버 작업 및 경로 처리기에서 Supabase에 액세스한다.
export const createClient = () => {
  const cookieStore = cookies();

  //사용자의 인증 정보를 검증하고 세션을 관리(클라이언트 쿠키를 처리)하는 작업을 수행
  //서버 구성 요소는 만료된 인증 토큰을 새로 고치고 저장하려면 미들웨어가 필요하다.
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {}
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch (error) {}
      }
    }
  });
};
