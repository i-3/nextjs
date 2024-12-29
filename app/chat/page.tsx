'use client';

import { useChat } from 'ai/react';
import clsx from 'clsx';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className={clsx(' flex flex-col h-[706px] pl-2 ')}>
        <div className='flex-1 overflow-y-auto'>
          {messages.map((m) => (
            <div
              key={m.id}
              className={clsx(
                'whitespace-pre-wrap',
                m.role === 'user' ? 'text-primary text-right pl-4' : 'pr-4'
              )}
            >
              {m.role === 'user' ? 'User:' : 'GroqAI:'}
              {'\n'}
              {m.content}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className={clsx(
            ' w-full max-w-md p-2 rounded shadow-xl border-none',
            'bg-muted'
          )}
          value={input}
          placeholder='Say something to GroqAI...'
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
