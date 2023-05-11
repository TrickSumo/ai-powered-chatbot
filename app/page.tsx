'use client'
import Image from 'next/image'
import { tmpdir } from 'os';
import { useState } from 'react';
import useLLM from 'usellm';

export default function Home() {
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [message, setMessage] = useState("");
  const llm = useLLM("https://usellm.org/api/llmservice");

  function handleChange(value = " ") {
    setMessage(value);
  }

  function handleClick() {
    llm.chat({
      messages: [...chatHistory, { role: "user", content: message }],
      onSuccess: (AIMessage) => {
        setChatHistory(prev => [...prev,{ role: 'assistant', content: AIMessage.content }])
      },
      onError: (error) => console.error(error)
    });
  }

  return (
    <div className=''>
      <p>{chatHistory?.map(chat => {
        return <><p className='border text-gray-900 m-9'>{chat.content}</p></>
      })}</p>
      <p className='float-right m-9'>
        <input className='border text-gray-900' type="text" value={message} onChange={(e) => { handleChange(e.target.value) }} />
        <button className='border text-gray-900' onClick={() => { chatHistory.push({ role: "user", content: message }); setMessage(""); handleClick() }}>Send</button>
      </p>
    </div>
  )
}
