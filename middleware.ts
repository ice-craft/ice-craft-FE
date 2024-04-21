import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

// 클라이언트의 요청이 서버에 도착하기 전 또는 응답이 클라이언트에게 전송되기 전에 미들웨어(중간 역할)가 실행됩니다.
export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // header에 존재하는 쿠키는 암호화가 되어있어 직접 값에 접근하기 힘들다.
  const loginCookie = response.headers.get("x-middleware-request-cookie");
  const url = request.nextUrl.pathname;

  // console.log("url", test);
  // console.log("updateUser", loginCookie);

  if (url == "/login" && loginCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/main";
    return NextResponse.redirect(url);
  }

  if (url == "/register" && loginCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/main";
    return NextResponse.redirect(url);
  }

  // URL 직접 접근을 막고싶지만 현재 이벤트 핸들러에서 발생하는 경로 자체도 막아버린다.
  // 현재 존재하는 방인지의 여부, 입장가능한 인원수 여부, 현재 로그인된 유저가 이미 접속된 방이 있는지 여부 ==> 필요한 데이터( roomId, userId, userNickname)
  // if (url.includes("/room/")) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/main";
  //   return NextResponse.redirect(url);
  // }
}

// 아래의 경로를 제외한 모든 경로에서 미들웨어를 실행
// 이미지 파일 (svg, png, jpg, jpeg, gif, webp)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
};
