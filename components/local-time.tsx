'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

type Props = {};

const LocalTime = (props: Props) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('lv-LV'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString('lv-LV'));
    }, 1000);
  }, []);

  return (
    <motion.div
      className=' absolute right-0 text-yellow-500 font-bold w-[80px]'
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          repeat: Infinity,
          duration: 1,
        },
      }}
    >
      {time}
    </motion.div>
  );
};

export default LocalTime;
