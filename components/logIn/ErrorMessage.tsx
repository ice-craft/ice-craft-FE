import React from "react";
import S from "@/style/login/login.module.css";

const ErrorMessage = ({ errorMessage }: { errorMessage: string[] }) => {
  return errorMessage.map((item) => <p className={S.error}>{item}</p>);
};

export default ErrorMessage;
