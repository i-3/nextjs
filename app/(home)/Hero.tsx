'use client';

import React from 'react';
import Image from 'next/image';
import profile from './assets/hero.jpg';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <div
      className=' w-11/12 max-w-3xl text-center mx-auto mt-4
      flex flex-col items-center justify-center gap-4'
    >
      <div className=' rounded-full bg-[#1f1f1f] w-[200px] h-[200px] relative'>
        <Image
          priority
          src={profile}
          alt='profile image'
          className=' rounded-full w-48 absolute transform
          -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
        />
      </div>
      <h1 className=' flex items-end gap-2 text-xl md:text-2xl mb-3'>
        Hello I'm Iurii Korotkov
      </h1>
      <div className=' text-xl sm:text-6xl lg:text-[66px] font-bold'>
        <TypeAnimation
          sequence={['Mobile Developer', 1000, 'Web Developer', 1000]}
          wrapper='span'
          speed={50}
          repeat={Infinity}
        />
      </div>
      <p className=' text-gray-400 max-w-2xl mx-auto'>
        Mobile Developer with 2 years of experience in React Native and skills
        in Flutter. Web Developer with skills in Next.js, MERN stack, Django and
        Ruby on Rails.
      </p>

      <div className=' flex flex-col sm:flex-row items-center gap-4 mt-4'>
        <a
          href='https://www.linkedin.com/in/iurii-korotkov-aa661b359/overlay/contact-info/'
          target='_blank'
          className=' px-10 py-3 rounded-full border border-white
        bg-[#1f1f1f] text-white flex items-center gap-2'
        >
          Contact Me
        </a>
        <a
          href='/CV_Iurii_Korotkov_en.pdf'
          download
          className=' px-10 py-3 rounded-full border border-gray-500 flex items-center gap-2'
        >
          Download CV
        </a>
      </div>
    </div>
  );
};

export default Hero;
