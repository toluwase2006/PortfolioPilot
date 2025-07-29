// ...imports unchanged
import { useEffect, useRef, useState } from "react";
import Typed from 'typed.js';
import { FaCircleArrowUp } from "react-icons/fa6";
import { RiAttachment2 } from "react-icons/ri";
import { ImSpinner2 } from "react-icons/im";

const PromptSection = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const typed = new Typed(typedRef.current!, {
      strings: ["Pilot"],
      typeSpeed: 70,
      backSpeed: 50,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  const sendRequests = async () => {
    if (!input.trim()) return;

    setLoading(true);

    const updatedMessages: { role: "user" | "assistant"; text: string }[] = [...messages, { role: 'user', text: input }];
    setMessages(updatedMessages);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Portfolio Copilot Chat',
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      const data = await response.json();
      console.log(data)
      const aiResponse = data?.choices?.[0]?.message?.content;

      if (aiResponse) {
        setMessages((prev) => [...prev, { role: 'assistant', text: aiResponse }]);
      }

      setInput("");
    } catch (error) {
      console.error("DeepSeek error:", error);
      setMessages((prev) => [...prev, { role: 'assistant', text: "Something went wrong with DeepSeek!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[rgb(41,42,45)] h-screen w-full flex flex-col items-center text-[rgb(171,178,189)] overflow-hidden'>
      <div className="py-10 px-4 flex-shrink-0">
        <p className='text-3xl text-center font-extrabold mb-6'>
          Hi, I'm Portfolio<span className='text-amber-600' ref={typedRef}></span>
        </p>
        <div className="flex items-center gap-6">
          <div className="w-8 h-0.5 bg-amber-500"></div>
          <p className="text-2xl font-bold">Your AI-powered investing co-pilot😊😊</p>
        </div>
        <p className="text-[1rem] text-center max-w-[56rem] mt-6">
          I help you make smarter financial decisions by analyzing your portfolio, optimizing your investments...
        </p>
        <p className="text-center text-[1rem] mt-6">How can I help you today?🥲</p>
      </div>

      <div className="flex-1 overflow-y-auto py-5 w-full max-w-[48rem] px-4" style={{ scrollbarWidth: "none" }}>
        {messages.map((msg, index) => (
          <div key={index} className={`p-3 rounded-xl ${msg.role === 'user' ? 'text-white self-end text-right ' : 'bg-[#3b3b3b] self-start text-left leading-6 whitespace-pre-line space-y-5 font-bold text-wrap word-spacing-[6rem]'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <ImSpinner2 className="animate-spin text-amber-500 text-2xl mt-4" />}
      </div>

      <div className="w-full max-w-[48rem] h-[7rem] relative rounded-xl bg-[#404045] px-4 mb-6 flex items-center">
        <input
          type="text"
          value={input}
          placeholder="Message Me🥲?"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendRequests();
            }
          }}
          className="w-full h-[3.5rem] text-white px-4 outline-none placeholder:text-[1rem] placeholder:text-[rgb(171,178,189)] rounded-md bg-[#505050]"
        />
        <div className="flex gap-4 absolute bottom-2 right-2">
          <RiAttachment2 className="w-6 h-6 text-white cursor-pointer" />
          <FaCircleArrowUp className="w-6 h-6 cursor-pointer" onClick={sendRequests} />
        </div>
      </div>
    </div>
  );
};

export default PromptSection;
