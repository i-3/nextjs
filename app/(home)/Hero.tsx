'use client';

import React from 'react';
import Image from 'next/image';
import profile from './assets/hero.png';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <div
      className=' w-11/12 max-w-3xl text-center mx-auto mt-32 flex flex-col
     items-center justify-center gap-4'
    >
      <div className=' rounded-full bg-[#1f1f1f] w-[200px] h-[200px] relative'>
        <Image
          src={profile}
          alt='profile image'
          className=' rounded-full w-48 absolute transform -translate-x-1/2 -translate-y-1/2
           top-1/2 left-1/2'
        />
      </div>
      <h3 className=' flex items-end gap-2 text-xl md:text-2xl mb-3'>
        Hello I'm Iurii Korotkov
      </h3>
      <div className=' text-xl sm:text-6xl lg:text-[66px] font-bold'>
        <TypeAnimation
          sequence={[
            'Frontend Developer',
            1000,
            'Mobile Developer',
            1000,
            'UI/UX Designer',
            1000,
          ]}
          wrapper='span'
          speed={50}
          repeat={Infinity}
        />
      </div>
      <p className=' text-gray-400 max-w-2xl mx-auto'>
        Frontend & Mobile Developer with 2 years of experience in React,
        Next.js, React Native, Flutter, and UI/UX design, building responsive
        and user-friendly applications.
      </p>
      <div className=' flex flex-col sm:flex-row items-center gap-4 mt-4'>
        <a
          href=''
          className=' px-10 py-3 rounded-full border border-white
        bg-[#1f1f1f] text-white flex items-center gap-2'
        >
          Contact Me
        </a>
        <a
          href=''
          className=' px-10 py-3 rounded-full border border-gray-500 flex items-center gap-2'
        >
          My Resume
        </a>
      </div>
    </div>
  );
};

export default Hero;
