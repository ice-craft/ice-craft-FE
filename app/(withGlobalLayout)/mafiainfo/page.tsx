"use client";

import React from "react";
import S from "@/style/mafiaInfo/mafiaInfo.module.css";
import { motion, useScroll, useSpring } from "framer-motion";

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
      <div>
        
      </div>
    </section>
  );
};
export default MafiaInfoPage;
