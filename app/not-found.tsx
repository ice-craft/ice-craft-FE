import S from "@/style/commons/commons.module.css";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section className={S.mainSection}>
      <h2>죄송합니다. 이 콘텐츠는 없거나 삭제되었습니다.</h2>
      <div>
        <h3>다른 콘텐츠를 찾아보세요.</h3>
        <div>
          <Link href="/main">홈으로 가기</Link>
        </div>
      </div>
    </section>
  );
};
export default NotFoundPage;
