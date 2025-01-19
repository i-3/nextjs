'use client';

import React, { useEffect, useState } from 'react';

type Props = {};

const LocalTime = (props: Props) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('lv-LV'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString('lv-LV'));
    }, 1000);
  }, []);

  return (
    <span className=' absolute right-0 text-yellow-500 font-bold w-[80px]'>
      {time}
    </span>
  );
};

export default LocalTime;
