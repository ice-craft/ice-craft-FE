import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

// 클라이언트의 요청이 서버에 도착하기 전 또는 응답이 클라이언트에게 전송되기 전에 미들웨어(중간 역할)가 실행됩니다.
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
