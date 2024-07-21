import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

// 클라이언트 쿠키를 서버 쿠키로 전환하여 Supabase 서버 클라이언트에 제공합니다.
export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers
      }
    });

    // Supabase 서버 클라이언트를 사용하여 사용자 세션을 새로 고칩니다.
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            // 쿠키가 업데이트되면, 요청과 응답의 쿠키를 업데이트합니다.
            request.cookies.set({
              name,
              value,
              ...options
            });
            response = NextResponse.next({
              request: {
                headers: request.headers
              }
            });
            response.cookies.set({
              name,
              value,
              ...options
            });
          },
          remove(name: string, options: CookieOptions) {
            // 쿠키가 삭제되면, 요청과 응답의 쿠키를 업데이트합니다.
            request.cookies.set({
              name,
              value: "",
              ...options
            });
            response = NextResponse.next({
              request: {
                headers: request.headers
              }
            });
            response.cookies.set({
              name,
              value: "",
              ...options
            });
          }
        }
      }
    );

    // 세션 만료 시간이 다가올 때마다 서버는 사용자의 인증 상태를 확인하고 세션을 새로 고칩니다.
    // 이를 통해 사용자는 로그인 상태를 지속하면서 애플리케이션을 계속 사용할 수 있습니다.
    await supabase.auth.getUser();

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers
      }
    });
  }
};
