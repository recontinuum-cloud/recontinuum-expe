// src/components/organisms/ReconChat.tsx
// React Island — client:idle hydration
// Full TypeScript, React Compiler compatible (no manual memoization)

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage, KnowledgeBase } from '../../types/index';

// ── Knowledge Base ─────────────────────────────────────────────────────────
const KB: KnowledgeBase = {
  greetings: {
    triggers: ['hello','hi','hey','good morning','good afternoon','good evening','namaste','greetings','howdy'],
    answer: () => `Namaste! 🙏 I'm **Recon**, the AI assistant for Recontinuum Holding Private Limited.\n\nHow can I assist you today? I can help with information about our company, portfolio, services, or how to get in touch.`,
  },
  about: {
    triggers: ['what is recontinuum','about recontinuum','tell me about','who are you','what do you do','about company','company','recontinuum'],
    answer: () => `**Recontinuum Holding Private Limited** is a purpose-driven holding company focused on building disciplined, science-led, and future-ready businesses that protect and enhance human potential.\n\nIndia-based with a global outlook. Our tagline: *Limitless · Leadership · Legacy*.`,
  },
  founder: {
    triggers: ['founder','rajan','bhosale','managing director','md','who started','who founded','who leads','army'],
    answer: () => `**Rajan Bhosale** is the Founder & Managing Director of Recontinuum.\n\nA former Indian Army professional, Mr. Bhosale leads with military discipline, structured thinking, and unwavering commitment to excellence — building institutions designed to endure for decades.`,
  },
  rajmeric: {
    triggers: ['rajmeric','lifesciences','life sciences','nutraceutical','wellness','supplement','health','stress','cognitive','adaptogen','performance'],
    answer: () => `**Rajmeric Lifesciences** is Recontinuum's flagship portfolio company:\n\n• Stress-adaptation biology\n• Cognitive balance & clarity\n• Long-term human performance\n• Science-grounded formulations\n\nRajmeric is dedicated to protecting and elevating human potential through evidence-based wellness.`,
  },
  services: {
    triggers: ['services','capabilities','what services','what do you offer','offerings','governance','investment','advisory','compliance','digital'],
    answer: () => `Recontinuum's core capabilities:\n\n1. 🏢 **Holding & Group Management**\n2. 🧬 **Nutraceutical & Life Sciences**\n3. 📈 **Strategic Investment**\n4. ⚙️ **Governance & Compliance**\n5. 🧩 **Business Advisory**\n6. 🌐 **Digital Infrastructure**\n\nWould you like details on any specific area?`,
  },
  contact: {
    triggers: ['contact','email','phone','address','reach','location','sangli','maharashtra','call','write','enquiry'],
    answer: () => `You can reach Recontinuum through:\n\n📧 **recontinuum.hq@gmail.com**\n📞 **+91 72497 86797**\n📍 Sangli, Maharashtra – 416416, India\n🌐 www.recontinuum.com\n\nAll enquiries are handled professionally and confidentially.`,
  },
  portfolio: {
    triggers: ['portfolio','subsidiary','group company','enterprise','businesses','ventures','investments'],
    answer: () => `Recontinuum currently has **1 active portfolio enterprise**:\n\n🌿 **Rajmeric Lifesciences** — Nutraceutical & Wellness\nFocused on stress adaptation, cognitive balance, and human performance.\n\nMore ventures are in strategic evaluation.`,
  },
  vision: {
    triggers: ['vision','mission','goal','values','integrity','resilience','legacy','future','purpose','philosophy'],
    answer: () => `Recontinuum's four core values:\n\n◈ **Integrity** — Uncompromising ethics\n◈ **Resilience** — Strength in adversity\n◈ **Precision** — Disciplined execution\n◈ **Long-Term Responsibility** — Built for generations\n\nMission: Create enduring value for individuals, communities, and future generations.`,
  },
  cin: {
    triggers: ['cin','registration','registered','legal','incorporate','company number','incorporate'],
    answer: () => `Recontinuum Holding Private Limited is a registered company in India.\n\n📋 **CIN:** U64200MH2026PTC467028\n📍 Registered in Maharashtra, India`,
  },
  website: {
    triggers: ['website','domain','url','recontinuum.com','online'],
    answer: () => `The official website is:\n\n🌐 **www.recontinuum.com**\n\nThis is the only official digital presence of Recontinuum Holding Private Limited.`,
  },
  thanks: {
    triggers: ['thank','thanks','thank you','great','awesome','helpful','good','excellent','perfect','fantastic','wonderful'],
    answer: () => `You're most welcome! 😊 It's my pleasure to assist.\n\nIs there anything else I can help you with regarding Recontinuum or Rajmeric Lifesciences?`,
  },
  bye: {
    triggers: ['bye','goodbye','see you','take care','exit','close','quit','ciao'],
    answer: () => `Thank you for your interest in Recontinuum! 🙏\n\nFeel free to return anytime. Have a wonderful day!\n\n*— Recon, AI Assistant*`,
  },
};

const FALLBACKS = [
  `I may not have that specific detail, but our team would be happy to help!\n\n📧 **recontinuum.hq@gmail.com**\n📞 **+91 72497 86797**`,
  `Great question! For detailed information please reach out to **recontinuum.hq@gmail.com** and our team will respond promptly.`,
  `I don't have that specific information, but please contact us at **+91 72497 86797** and we'd love to assist!`,
] as const;

const QUICK_QUESTIONS = [
  'What is Recontinuum?',
  'Tell me about Rajmeric',
  'Who is the founder?',
  'How can I contact you?',
] as const;

// ── Helpers ────────────────────────────────────────────────────────────────
function getAnswer(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const entry of Object.values(KB)) {
    if (entry.triggers.some(t => lower.includes(t))) {
      return entry.answer();
    }
  }
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

function getTime(): string {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ── Markdown renderer (lightweight, no deps) ───────────────────────────────
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
}

// ── Component ──────────────────────────────────────────────────────────────
export default function ReconChat() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [messages,  setMessages]  = useState<ChatMessage[]>([]);
  const [input,     setInput]     = useState('');
  const [isTyping,  setIsTyping]  = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [greeted,   setGreeted]   = useState(false);
  const msgsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  function addBotMessage(content: string) {
    const msg: ChatMessage = { id: makeId(), role: 'bot', content, timestamp: new Date() };
    setMessages(prev => [...prev, msg]);
  }

  function addUserMessage(content: string) {
    const msg: ChatMessage = { id: makeId(), role: 'user', content, timestamp: new Date() };
    setMessages(prev => [...prev, msg]);
  }

  function toggleChat() {
    setIsOpen(prev => !prev);
    setShowBadge(false);
    if (!greeted) {
      setGreeted(true);
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage("Namaste! 🙏 I'm **Recon**, AI Assistant for Recontinuum Holding Private Limited.\n\nHow can I help you today? Ask me about our company, Rajmeric Lifesciences, our team, or how to get in touch!");
        }, 900);
      }, 300);
    }
  }

  function sendMessage(text: string = input) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setInput('');
    addUserMessage(trimmed);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage(getAnswer(trimmed));
    }, 800 + Math.random() * 600);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') sendMessage();
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={toggleChat}
        aria-label="Chat with Recon AI Assistant"
        className="fixed bottom-8 right-8 z-[9000] w-[62px] h-[62px] rounded-full
                   bg-gold-gradient border-none cursor-pointer
                   flex items-center justify-content shadow-[0_8px_32px_rgba(200,164,74,0.45)]
                   transition-transform duration-300 hover:scale-110
                   animate-[fabPulse_3s_infinite]"
        style={{ animation: 'fabPulse 3s ease-in-out infinite' }}
      >
        {showBadge && (
          <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full
                           bg-red-500 border-2 border-obsidian-900
                           text-[9px] text-white font-bold
                           flex items-center justify-center">
            1
          </span>
        )}
        <svg viewBox="0 0 24 24" fill="none" stroke="#09090b" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 mx-auto">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>

      {/* Chat Window */}
      <div
        role="dialog"
        aria-label="Recon AI Chat"
        aria-modal="true"
        className={`fixed bottom-[7rem] right-8 z-[9001] w-[380px] max-h-[560px]
                    bg-[#111114] border border-border border-t-[3px] border-t-gold
                    shadow-chat flex flex-col
                    transition-all duration-[350ms] ease-spring
                    ${isOpen
                      ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                      : 'opacity-0 translate-y-5 scale-95 pointer-events-none'
                    }
                    max-sm:w-[calc(100vw-2rem)] max-sm:right-4`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4
                        bg-gradient-to-r from-charcoal to-[#1e1e26]
                        border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-gradient
                            flex items-center justify-center
                            font-display text-lg font-medium text-obsidian-900 flex-shrink-0">
              R
            </div>
            <div>
              <p className="font-display text-[1rem] font-medium text-ivory leading-tight">Recon</p>
              <p className="text-[0.6rem] uppercase tracking-[0.15em] text-emerald-400
                            flex items-center gap-1 before:content-[''] before:w-[5px]
                            before:h-[5px] before:rounded-full before:bg-emerald-400 before:inline-block">
                Online · AI Assistant
              </p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            aria-label="Close chat"
            className="text-silver hover:text-ivory text-[1.2rem] leading-none p-1
                       bg-transparent border-none cursor-pointer transition-colors"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div
          ref={msgsRef}
          className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 min-h-[300px] max-h-[360px]"
        >
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-2 items-end ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center
                              text-[0.65rem] font-bold flex-shrink-0
                              ${msg.role === 'bot'
                                ? 'bg-gold-gradient text-obsidian-900'
                                : 'bg-gradient-to-br from-[#3a3a48] to-[#28283a] text-gold'
                              }`}>
                {msg.role === 'bot' ? 'R' : 'U'}
              </div>
              <div>
                <div
                  className={`max-w-[78%] px-4 py-3 text-[0.83rem] leading-[1.6]
                              ${msg.role === 'bot'
                                ? 'bg-[#1e1e26] border border-[#2a2a35] text-mist rounded-tr-sm rounded-bl-sm rounded-br-sm'
                                : 'bg-gold-gradient text-obsidian-900 font-normal rounded-tl-sm rounded-bl-sm rounded-br-sm'
                              }`}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                />
                <p className={`text-[0.55rem] text-[#555560] mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  {getTime()}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-full bg-gold-gradient
                              flex items-center justify-center
                              text-[0.65rem] font-bold text-obsidian-900">
                R
              </div>
              <div className="flex gap-1 items-center px-4 py-3 bg-[#1e1e26] border border-[#2a2a35]">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className="w-[6px] h-[6px] rounded-full bg-gold"
                    style={{ animation: `dot 1.2s ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
              <span className="text-[0.7rem] text-silver">Recon is typing...</span>
            </div>
          )}
        </div>

        {/* Quick suggestions */}
        {messages.length <= 1 && (
          <div className="px-5 py-3 flex gap-2 flex-wrap border-t border-[#1e1e24] flex-shrink-0">
            {QUICK_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-[0.62rem] tracking-[0.08em] text-gold
                           bg-gold/8 border border-gold/25 px-3 py-1.5
                           cursor-pointer transition-all duration-200
                           hover:bg-gold/18 hover:border-gold
                           font-sans"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-5 py-4 border-t border-graphite flex gap-3 items-center flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            aria-label="Chat message"
            className="flex-1 bg-[#1a1a1e] border border-border text-mist
                       font-sans text-[0.85rem] font-light px-4 py-2.5
                       outline-none transition-colors duration-300
                       focus:border-gold/50 placeholder:text-[#444450]"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            className="w-[38px] h-[38px] bg-gold-gradient border-none cursor-pointer
                       flex items-center justify-center flex-shrink-0
                       transition-all duration-300 hover:scale-108 hover:shadow-gold
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#09090b" strokeWidth="2.5"
                 strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(200,164,74,0.45); }
          50%       { box-shadow: 0 8px 48px rgba(200,164,74,0.7);  }
        }
        @keyframes dot {
          0%, 60%, 100% { transform: translateY(0);    opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1;   }
        }
      `}</style>
    </>
  );
}
