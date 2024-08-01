"use client";

import React, { useRef, useState } from "react";
import S from "@/style/commons/commons.module.css";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const InquiryPage = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSending && form.current) {
      setIsSending(true);

      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!
        )
        .then(
          (result) => {
            toast.success("문의가 성공적으로 전송되었습니다.");
            form.current?.reset();
          },
          (error) => {
            toast.error("이메일 전송이 실패되었습니다. 다시 시도해 주세요.");
          }
        )
        .finally(() => {
          setIsSending(false);
        });
    }
  };

  return (
    <section className={S.inquiryWrap}>
      <h2>문의사항</h2>
      <form ref={form} onSubmit={sendEmail} className={S.sendInner}>
        <div>
          <label>
            답변 받으실 이메일 <span>*</span>
          </label>
          <input type="email" name="user_email" placeholder="ex) abc@example.com" autoFocus required />
        </div>
        <div>
          <label>
            제목 <span>*</span>
          </label>
          <input type="text" name="title" placeholder="제목을 입력해주세요.(20자 이내)" maxLength={20} required />
        </div>
        <div>
          <label>
            내용 <span>*</span>
          </label>
          <textarea name="message" placeholder="내용을 입력해주세요." required />
        </div>
        <button type="submit" disabled={isSending}>
          보내기
        </button>
      </form>
    </section>
  );
};

export default InquiryPage;
