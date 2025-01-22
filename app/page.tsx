'use client';

import { Mic, MicOff } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';

export default function Page() {
  const recognitionRef = useRef<SpeechRecognition>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [text, setText] = useState<string>();
  const [translation, setTranslation] = useState<string>();
  const [voices, setVoices] = useState<Array<SpeechSynthesisVoice>>();
  const [voice, setVoice] = useState<SpeechSynthesisVoice>();
  const [languages, setLanguages] = useState<String[]>([]);
  const [language, setLanguage] = useState('en-US');

  function setSpeech() {
    return new Promise<Array<SpeechSynthesisVoice>>(function (resolve) {
      let synth = window.speechSynthesis;
      let id: any;

      id = setInterval(() => {
        if (synth.getVoices().length !== 0) {
          resolve(synth.getVoices());
          clearInterval(id);
        }
      }, 1);
    });
  }

  const s = setSpeech();

  s.then((V) => {
    setVoices(V as Array<SpeechSynthesisVoice>);

    let arr: string[] = [];
    V.map((v) => {
      if (!arr.includes(v.lang)) arr.push(v.lang);
    });
    setLanguages(arr);
  });

  const isSpeechDetected = false;

  function handleOnRecord() {
    if (isActive) {
      recognitionRef.current?.stop();
      setIsActive(false);
      return;
    }

    speak(' ');

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = language;

    recognitionRef.current.onstart = function () {
      setIsActive(true);
    };
    recognitionRef.current.onend = function () {
      setIsActive(false);
    };

    recognitionRef.current.onresult = async function (event) {
      const transcript = event.results[0][0].transcript;

      setText(transcript);

      const results = await fetch('/api/translate', {
        method: 'POST',
        body: JSON.stringify({
          text: transcript,
          language: voice?.lang,
        }),
      }).then((r) => r.json());

      setTranslation(results.text);

      speak(results.text);
    };

    recognitionRef.current.start();
  }

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);

    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className='w-full pt-16'>
      <motion.div
        className=' absolute right-0 text-yellow-500 font-bold w-[80px]'
        initial={{ opacity: 0, x: -100 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            repeat: Infinity,
            duration: 1,
          },
        }}
      >
        XXX
      </motion.div>

      <div
        className=' border flex flex-col max-w-md
      mx-auto rounded-md p-4'
      >
        <div className='border p-4 rounded-md text-sm'>
          Select the language you will speak
          <select
            className=' bg-muted mt-2 text-[.7rem] rounded-sm p-2 mr-32'
            name='language'
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            {languages.map((i, k) => {
              return <option key={k}>{i}</option>;
            })}
          </select>
        </div>

        <div className='mt-4 border p-4 rounded-md text-sm'>
          Select the voice that will speak the translation
          <select
            className='bg-muted mt-2 text-[.7rem] rounded-sm p-2 '
            name='voice'
            value={voice?.lang}
            onChange={(event) => {
              // console.log(event.target.value);
              let v = voices?.find((i) => i.lang == event.target.value);
              setVoice(v);
            }}
          >
            {voices?.map((voice, k) => {
              return (
                <option key={k} value={voice.lang}>
                  {voice.lang} {voice.name}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className={`mt-4 text-white flex items-center justify-center
            mx-auto w-24 h-24 font-semibold text-sm  rounded-full  ${
              isActive ? ' bg-red-500' : 'hover:bg-red-900 bg-red-950'
            }`}
          onClick={handleOnRecord}
        >
          {isActive ? <Mic /> : <MicOff />}
        </button>

        <div className='flex flex-col mt-4'>
          <div className=' border w-72 p-2 rounded-md self-end'>
            <p className=' text-primary'>What you said:</p>
            {text}
          </div>

          <div className=' border max-w-72 mt-4 p-2 rounded-md'>
            <p className='text-primary'>What Groq translated:</p>
            {translation}
          </div>
        </div>
      </div>
    </main>
  );
}
