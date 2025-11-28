"use client";

// import { useChat } from 'ai/react';

export default function Chat() {
  // const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="h-full flex flex-col max-w-md mx-auto p-4">
      <div className="h-full p-2 flex border rounded-md">
        {/* {messages.length > 0 ? (
          <div className="flex-1 overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`whitespace-pre-wrap ${
                  m.role === "user" ? "text-primary text-right pl-4" : "pr-4"
                }`}
              >
                {m.role === "user" ? "User:" : "GroqAI:"}
                {"\n"}
                {m.content}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full justify-center items-center text-neutral-500">
            Groq Chat
          </div>
        )} */}
      </div>

      {/* <form onSubmit={handleSubmit}>
        <input
          className=' static w-full p-2 rounded-md shadow-xl border mt-4 bg-background'
          value={input}
          placeholder='Say something to AI ...'
          onChange={handleInputChange}
        />
      </form> */}
    </div>
  );
}
