import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get("room");
  const userId = req.nextUrl.searchParams.get("userI");
  const nickname = req.nextUrl.searchParams.get("userNickname");

  if (!room) {
    return NextResponse.json({ error: "Missing getToken: room parameter in the query" }, { status: 400 });
  } else if (!userId) {
    return NextResponse.json({ error: "Missing getToken: userId parameter in the query" }, { status: 400 });
  } else if (!nickname) {
    return NextResponse.json({ error: "Missing getToken: nickname parameter in the query" }, { status: 400 });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: userId, name: nickname, metadata: room });

  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

  return NextResponse.json({ token: await at.toJwt() });
}
