'use client';

import { useEffect, useRef } from 'react';
import './styles.css';

export default function Clock() {
  const secondHandle = useRef<HTMLDivElement>(null);
  const minuteHandle = useRef<HTMLDivElement>(null);
  const hourHandle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInterval(() => {
      let date = new Date();
      let ss = date.getSeconds();
      let mm = date.getMinutes();
      let hh = date.getHours();

      if (secondHandle.current)
        secondHandle.current.style.transform = `rotateZ(${ss * 6}deg)`;
      if (minuteHandle.current)
        minuteHandle.current.style.transform = `rotateZ(${mm * 6}deg)`;
      if (hourHandle.current)
        hourHandle.current.style.transform = `rotateZ(${hh * 30 + mm * 0.5}deg)`;
    }, 1000);
  }, []);

  return (
    <div id='app' className='mt-16'>
      <div className='clock-container'>
        <div className='clock'>
          <div ref={hourHandle} className='hor' id='hor'>
            <div className='hr'></div>
          </div>
          <div ref={minuteHandle} className='min' id='min'>
            <div className='mn'></div>
          </div>
          <div ref={secondHandle} className='sec' id='sec'>
            <div className='sc'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
