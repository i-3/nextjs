import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq();

export async function POST(request: Request) {
  const { text, language } = await request.json();

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
          You will be provided with a sentence. Your tasks are to:
          - Detect what language the sentence is in
          - Translate the sentence into ${language}
          Do not return anything other than the translated sentence.
        `,
      },
      {
        role: 'user',
        content: text,
      },
    ],
    model: 'llama-3.3-70b-versatile',

    //
    // Optional parameters
    //

    // Controls randomness: lowering results in less random completions.
    // As the temperature approaches zero, the model will become deterministic
    // and repetitive.
    temperature: 0.7,

    // The maximum number of tokens to generate. Requests can use up to
    // 2048 tokens shared between prompt and completion.
    max_tokens: 64,

    // Controls diversity via nucleus sampling: 0.5 means half of all
    // likelihood-weighted options are considered.
    top_p: 1,

    // A stop sequence is a predefined or user-specified text string that
    // signals an AI to stop generating content, ensuring its responses
    // remain focused and concise. Examples include punctuation marks and
    // markers like "[end]".
    // stop: null,

    // If set, partial message deltas will be sent.
    // stream: false,
  });

  // console.log(chatCompletion.choices[0]?.message?.content || '');

  return NextResponse.json({
    text: chatCompletion.choices[0]?.message?.content,
  });
}
