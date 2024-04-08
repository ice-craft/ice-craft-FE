import S from "@/style/commons/commons.module.css";

const NotFoundPage = () => {
  return (
    <section className={S.mainSection}>
      <h2>
        잘못된 접근입니다. <p>이 페이지는 존재하지 않습니다.</p>
      </h2>
    </section>
  );
};
export default NotFoundPage;
