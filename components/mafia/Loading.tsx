import Image from "next/image";
import React from "react";
import LoadingIcon from "@/assets/images/loading.svg";
import S from "@/style/commons/commons.module.css";

const Loading = () => {
  return (
    <section className={S.loading}>
      <Image src={LoadingIcon} alt="Loading" className={S.loadingAnimation} />
    </section>
  );
};

export default Loading;
