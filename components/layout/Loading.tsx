import usePopStateHandler from "@/hooks/usePopStateHandler";
import { designer } from "@/public/fonts/fonts";
import { useRoomAction } from "@/store/room-store";
import S from "@/style/commons/commons.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Loading = () => {
  const router = useRouter();
  const { setIsEntry } = useRoomAction();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/main");
    }, 3000);
    return () => {
      // 초기화
      setIsEntry(false);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className={`${S.loadingWrapper} ${designer.className}`}>
      <div>IceCraft</div>
      <div>Loading...</div>
      <div>메인페이지로 이동중 입니다.</div>
    </section>
  );
};

export default Loading;
