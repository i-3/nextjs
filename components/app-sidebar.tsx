// 'use client';

import { Languages, MessagesSquare, Table2 } from 'lucide-react';
// import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { ModeToggle } from './mode-toggle';
import React from 'react';
import Auth from '@/components/auth';

const items = [
  {
    title: 'Translator',
    url: '/',
    icon: Languages,
  },
  {
    title: 'Vacancies',
    url: '/vacancies',
    icon: Table2,
  },
  {
    title: 'Groq chatbot',
    url: '/chat',
    icon: MessagesSquare,
  },
];

export function AppSidebar() {
  // const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <ModeToggle />
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className='mt-24'>
        <SidebarGroup></SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className='my-2'>
                  {/* <SidebarMenuButton asChild isActive={pathname === item.url}> */}
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />

                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className='flex-row justify-between items-center'>
        <a
          href='https://freedns.afraid.org'
          target='_blank'
          className='text-primary hover:underline text-sm'
        >
          Free DNS
        </a>

        <Auth />
      </SidebarFooter>
    </Sidebar>
  );
}