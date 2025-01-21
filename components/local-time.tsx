'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {};

const fadeUpVariant = {
  initial: { opacity: 0, y: 500 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const LocalTime = (props: Props) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('lv-LV'));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString('lv-LV'));
    }, 1000);
  }, []);

  return (
    <motion.div
      className=' absolute right-0 text-yellow-500 font-bold w-[80px]'
      variants={fadeUpVariant}
      initial='initial'
      animate='animate'
    >
      {time}
    </motion.div>
  );
};

export default LocalTime;
