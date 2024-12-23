'use client';

import { useChat } from 'ai/react';
import clsx from 'clsx';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    // maxSteps: 5,
  });

  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      {messages.map((m) => (
        <div key={m.id} className='whitespace-pre-wrap '>
          {m.role === 'user' ? 'User: ' : 'Groq: '}
          {m.content}
          {/* {m.toolInvocations ? (
            <pre>{JSON.stringify(m.toolInvocations, null, 2)}</pre>
          ) : (
            <p>{m.content}</p>
          )} */}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className={clsx(
            'fixed bottom-24 w-full max-w-md p-2 rounded shadow-xl border-none',
            'bg-muted'
          )}
          value={input}
          placeholder='Say something to Groq ...'
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
