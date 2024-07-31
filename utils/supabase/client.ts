import { Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
// Next.js에서 Supabase에 액세스하려면 두 가지 유형의 Supabase 클라이언트가 필요
// 클라이언트 구성 요소 - 클라이언트 구성 요소(브라우저)에서 Supabase에 액세스한다.
// 서버 구성 요소  - 서버 구성 요소(서버 작업 및 경로 처리기)에서 Supabase에 액세스한다.

export const createClient = () =>
  // 서버로부터 데이터를 가져오거나 사용자 인증과 관련된 작업을 수행
  createBrowserClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
