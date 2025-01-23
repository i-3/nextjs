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
      className=' absolute right-2 text-yellow-500 font-bold w-[72px]'
      initial={{ opacity: 1, x: 0 }}
      animate={{
        rotateY: 360,
        opacity: 1,
        x: 0,
        transition: {
          repeat: Infinity,
          duration: 5,
        },
      }}
    >
      {time}
    </motion.div>
  );
};

export default LocalTime;
