"use client";
import React from "react";
import S from "@/style/mafiaInfo/mafiaInfo.module.css";
import { motion, useScroll, useSpring } from "framer-motion";
import InfoTitle from "@/components/mafiaInfo/InfoTitle";
import InfoItem from "@/components/mafiaInfo/InfoItem";

const MafiaInfoPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className={S.infoWrapper}>
      <motion.div className={S.progressBar} style={{ scaleX }} />
      <InfoTitle />
      <InfoItem />
    </section>
  );
};
export default MafiaInfoPage;
