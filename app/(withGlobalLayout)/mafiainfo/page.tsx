"use client";
import React from "react";
import S from "@/style/mafiaInfo/mafiaInfo.module.css";
import { designer } from "@/public/fonts/fonts";
import ParallaxText from "@/components/mafiaInfo/InfoTitle";
import InfoItem from "@/components/mafiaInfo/InfoItem";
import { motion, useScroll, useSpring } from "framer-motion";
import GoTopButton from "@/utils/GoTopButton";

const MafiaInfoPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section>
      <motion.div className={S.progressBar} style={{ scaleX }} />
      <div className={`${S.infoTitle} ${designer.className}`}>
        <ParallaxText baseVelocity={-5}>Mafia Game</ParallaxText>
        <ParallaxText baseVelocity={5}>Game Rules</ParallaxText>
      </div>
      <div className={S.infoWrapper}>
        <InfoItem />
      </div>
      <GoTopButton />
    </section>
  );
};
export default MafiaInfoPage;
