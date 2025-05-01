'use client';

// import { PROJECTS_DATA } from './assets/data';
import { CodeBracketIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { useInView, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'React Portfolio Website',
    description:
      'A React portfolio highlighting skills, projects, and experience with a dynamic design.',
    image: '/1.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 2,
    title: 'E-Commerce Website',
    description:
      'An online store that allows users to browse, buy, and securely manage products or services.',
    image: '/2.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 3,
    title: 'Admin Dashboard Application',
    description:
      'A control panel that provides insights, management tools, and analytics to oversee and optimize a system or application.',
    image: '/3.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 4,
    title: 'Blog Website',
    description:
      'An online platform for publishing and sharing articles, insights, and stories on various topics.',
    image: '/4.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 5,
    title: 'Weather Application',
    description:
      'A weather app that provides real-time forecasts, temperature, and climate details for various locations.',
    image: '/5.png',
    tag: ['All', 'Mobile'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 6,
    title: 'Social Media Website',
    description:
      'A social media platform that enables users to connect, share, and interact through posts, messages, and multimedia content.',
    image: '/6.png',
    tag: ['All', 'Mobile'],
    gitUrl: '/',
    previewUrl: '/',
  },
];

const Projects = () => {
  const [tag, setTag] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const filteredProjects = PROJECTS_DATA.filter((project) =>
    project.tag.includes(tag)
  );

  return (
    <section id='projects' className=' container mt-10 mx-auto px-12 py-4'>
      <h2 className=' text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12'>
        My Projects
      </h2>
      <div className='text-white flex flex-row justify-center items-center gap-2 py-6'>
        {['All', 'Mobile', 'Web'].map((tagName) => (
          <button
            key={tagName}
            className={`${
              tag == tagName
                ? 'text-white border-[#00adb5]'
                : 'text-[#adb7be] border-slate-600 hover:border-white'
            } rounded-full border-2 px-6 py-3 text-xl cursor-pointer`}
            onClick={() => setTag(tagName)}
          >
            {tagName}
          </button>
        ))}
      </div>
      <ul ref={ref} className=' grid md:grid-cols-3 gap-8 md:gap-12'>
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial='initial'
            animate={isInView ? 'animate' : 'initial'}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <div>
              <div
                className=' h-52 md:h-72 rounded-t-xl relative group'
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              >
                <div
                  className=' overlay items-center justify-center absolute top-0 left-0
                w-full h-full bg-opacity-0 hidden group-hover:flex group-hover:opacity-90
                 group-hover:bg-[#181818] transition-all duration-500'
                >
                  <Link
                    href={project.gitUrl}
                    className=' h-14 w-14 mr-2 border-2 relative rounded-full
                    border-[#adb7be] hover:border-white group/link'
                  >
                    <CodeBracketIcon
                      className=' h-10 w-10 text-[#adb7be] absolute
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    cursor-pointer group-hover/link:text-white'
                    />
                  </Link>
                  <Link
                    href={project.previewUrl}
                    className=' h-14 w-14 mr-2 border-2 relative rounded-full
                    border-[#adb7be] hover:border-white group/link'
                  >
                    <GlobeAltIcon
                      className=' h-10 w-10 text-[#adb7be] absolute
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    cursor-pointer group-hover/link:text-white'
                    />
                  </Link>
                </div>
              </div>

              <div className='text-white rounded-b-xl mt-3 bg-[#181818] py-6 px-4'>
                <h5 className='text-xl font-semibold mb-2'>{project.title}</h5>
                <p className='text-[#adb7be]'>{project.description}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
