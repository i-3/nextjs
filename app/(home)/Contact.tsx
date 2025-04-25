import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import linkedin from './assets/linkedinIcon.png';
import github from './assets/githubIcon.png';

const Contact = () => {
  return (
    <section
      id='contact'
      className='container mx-auto px-6 md:px-12 lg:px-24 py-24'
    >
      <div className='grid md:grid-cols-2 gap-12 items-center'>
        <div>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Let's Connect
          </h2>
          <p className='text-[#adb7be] text-lg mb-6 leading-relaxed'>
            I'm always excited to connect, share ideas, and collaborate on
            innovative projects. Let's work together to create something
            impactful and inspiring!
          </p>
          <div className='flex gap-4'>
            <Link href='https://github.com'>
              <Image
                src={github}
                alt='github icon'
                width={40}
                height={40}
                className='hover:scale-110 transition-transform duration-300 cursor-pointer'
              />
            </Link>
            <Link href='https://linkedin.com'>
              <Image
                src={linkedin}
                alt='linkedin icon'
                width={40}
                height={40}
                className='hover:scale-110 transition-transform duration-300 cursor-pointer'
              />
            </Link>
          </div>
        </div>

        <div className='bg-[#1a1a1a] p-8 rounded-xl shadow-lg'>
          <form className='flex flex-col space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-white font-medium mb-2'
              >
                Your Email
              </label>
              <input
                id='email'
                type='email'
                required
                placeholder='YourEmail@Email.com'
                autoComplete='off'
                className='w-full p-3 rounded-lg bg-[#1f1f1f] border border-[#33353f]
                text-white placeholder-[#9ca2a9] focus:ring-2 focus:ring-[#00adb5]
                focus:outline-none transition-all duration-300'
              />
            </div>
            <div>
              <label
                htmlFor='subject'
                className='block text-white font-medium mb-2'
              >
                Subject
              </label>
              <input
                id='subject'
                type='text'
                required
                placeholder='Subject'
                autoComplete='off'
                className='w-full p-3 rounded-lg bg-[#1f1f1f] border border-[#33353f]
                text-white placeholder-[#9ca2a9] focus:ring-2 focus:ring-[#00adb5]
                focus:outline-none transition-all duration-300'
              />
            </div>
            <div>
              <label
                htmlFor='message'
                className='block text-white font-medium mb-2'
              >
                Message
              </label>
              <textarea
                id='message'
                required
                placeholder="let's talk about..."
                className='w-full p-3 rounded-lg bg-[#1f1f1f] border border-[#33353f]
                h-32 resize-none text-white placeholder-[#9ca2a9] focus:ring-2 focus:ring-[#00adb5]
                focus:outline-none transition-all duration-300'
              />
            </div>
            <button
              type='submit'
              className='w-full bg-[#00adb5] hover:bg-[#008188] text-white font-medium py-3
              rounded-lg transition-all duration-300 cursor-pointer'
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
