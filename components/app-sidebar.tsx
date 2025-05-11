// 'use client';

import { Home, Languages, MessagesSquare, Table2 } from 'lucide-react';
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
import Clock from './clock';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Applications',
    url: '/applications',
    icon: Table2,
  },
  {
    title: 'AI translator',
    url: '/translate',
    icon: Languages,
  },
  {
    title: 'Chat with AI',
    url: '/chat',
    icon: MessagesSquare,
  },
];

export function AppSidebar() {
  // const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className='items-end'>
        <ModeToggle />
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className=''>
        <SidebarGroup>
          {/* <SidebarGroupLabel></SidebarGroupLabel> */}

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

            <Clock />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup></SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className='flex-row justify-end items-center'>
        <a
          href='https://freedns.afraid.org'
          target='_blank'
          className='text-primary hover:underline text-sm py-4'
        >
          Free DNS
        </a>

        {/* <Auth /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
