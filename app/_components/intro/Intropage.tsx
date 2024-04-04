import React from 'react'
import S from '@/app/_style/Intropage/video.module.css'

const Intropage = () => {
  return (
    <section className="">
        <header className="">
            <div className="header_logo"></div>
        </header>
        <video className={S.video} src="https://ktfrmyssyzqmoljohixh.supabase.co/storage/v1/object/public/vedio/intro.mp4?t=2024-04-04T09%3A05%3A53.658Z"muted autoPlay loop></video>
    </section>
  )
}



export default Intropage