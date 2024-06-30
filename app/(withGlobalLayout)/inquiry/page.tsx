import React, { useRef } from "react";
import S from "@/style/commons/commons.module.css";
import { SMTPClient } from 'emailjs';

const client = new SMTPClient({
	user: 'user',
	password: 'password',
	host: 'smtp.your-email.com',
	ssl: true,
});

const InquiryPage = () => {
  const form = useRef();

  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
  .then((result:any) => {
      console.log(result.text);
      alert("문의가 성공적으로 전송되었습니다!");
  }, (error:any) => {
      console.log(error.text);
      alert("문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
  });
};

  return (
    <section className={S.inquiryWrap}>
      <h2>문의사항</h2>
      <form ref={form} onSubmit={sendEmail}>
        <label>
          답변 받으실 이메일
          <input type="email" name="user_email" placeholder="ex)abc@example.com" required />
        </label>

        <label>
          문의 제목
          <input type="text" name="ask_title" placeholder="제목을 입력해주세요.(20자 이내)" maxLength={20} required />
        </label>

        <label>
          문의 내용
          <textarea name="ask_message" placeholder="제목을 입력해주세요." required />
        </label>

        <button type="submit" value="문의하기" />
      </form>
    </section>
  );
};

export default InquiryPage;
