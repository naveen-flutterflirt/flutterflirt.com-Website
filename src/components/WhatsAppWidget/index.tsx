"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Config ──────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "919876543210"; // replace with your number (no + or spaces)
const AGENT_NAME      = "FlutterFlirt Support";
const AGENT_SUBTITLE  = "Typically replies in minutes";

// Three qualifying questions shown in the chat bot
const QUESTIONS = [
  {
    id: "q1",
    text: "👋 Hi! Welcome to FlutterFlirt.\n\nWhat best describes you?",
    options: [
      "Business Owner / Decision Maker",
      "IT Manager / Technical Lead",
      "Consultant / Partner",
      "Just Exploring",
    ],
  },
  {
    id: "q2",
    text: "Great! What service are you interested in?",
    options: [
      "Microsoft Dynamics 365",
      "ERP / CRM Implementation",
      "AI & Automation",
      "Custom Software Development",
    ],
  },
  {
    id: "q3",
    text: "How soon are you looking to get started?",
    options: [
      "Immediately (within 2 weeks)",
      "Within 1–3 months",
      "Planning for later",
      "Just gathering information",
    ],
  },
];

interface Answer {
  question: string;
  answer: string;
}

// ── WhatsApp redirect ───────────────────────────────────────────────────────
function buildWhatsAppUrl(answers: Answer[]) {
  const lines = [
    "Hello FlutterFlirt! I came through your website and answered a few questions:",
    "",
    ...answers.map((a, i) => `${i + 1}. ${a.question}\n   → ${a.answer}`),
    "",
    "I'd love to connect with your team.",
  ];
  const msg = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

// ── Bot message bubble ──────────────────────────────────────────────────────
function BotBubble({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.28, ease: "easeOut" }}
      className="flex items-end gap-2"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-[#25D366] flex items-center justify-center shadow-sm">
        <img src="/icon.svg" alt="FF" className="h-4 w-4 brightness-0 invert" />
      </div>
      <div className="max-w-[80%] rounded-[16px] rounded-bl-[4px] bg-white px-4 py-3 text-[13px] leading-[1.55] text-[#111b21] shadow-[0_1px_4px_rgba(0,0,0,0.10)] whitespace-pre-line">
        {text}
      </div>
    </motion.div>
  );
}

// ── Option button ───────────────────────────────────────────────────────────
function OptionBtn({
  label,
  onClick,
  selected,
}: {
  label: string;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={!selected ? { scale: 1.02 } : {}}
      whileTap={!selected ? { scale: 0.97 } : {}}
      disabled={selected}
      onClick={onClick}
      className={`w-full text-left rounded-xl border px-4 py-2.5 text-[12.5px] font-medium transition-colors duration-150 ${
        selected
          ? "border-[#25D366] bg-[#e9fbe9] text-[#128c51] cursor-default"
          : "border-[#d1e8d5] bg-white text-[#111b21] hover:border-[#25D366] hover:bg-[#f0faf2]"
      }`}
    >
      {selected && <span className="mr-1.5">✓</span>}
      {label}
    </motion.button>
  );
}

// ── User reply bubble ───────────────────────────────────────────────────────
function UserBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="flex justify-end"
    >
      <div className="max-w-[75%] rounded-[16px] rounded-br-[4px] bg-[#dcf8c6] px-4 py-2.5 text-[13px] text-[#111b21] shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
        {text}
      </div>
    </motion.div>
  );
}

// ── Typing indicator ────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-[#25D366] flex items-center justify-center shadow-sm">
        <img src="/icon.svg" alt="FF" className="h-4 w-4 brightness-0 invert" />
      </div>
      <div className="rounded-[16px] rounded-bl-[4px] bg-white px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.10)]">
        <div className="flex gap-1 items-center h-4">
          {[0, 0.18, 0.36].map((d, i) => (
            <motion.span
              key={i}
              className="block h-2 w-2 rounded-full bg-[#aaa]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: d, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main widget ─────────────────────────────────────────────────────────────
export default function WhatsAppWidget() {
  const [open, setOpen]           = useState(false);
  const [step, setStep]           = useState(0);       // 0-2 = questions, 3 = done
  const [typing, setTyping]       = useState(false);
  const [answers, setAnswers]     = useState<Answer[]>([]);
  const [selectedOpt, setSelected]= useState<string | null>(null);
  const [labelVisible, setLabelVisible] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Hide label after 4 s
  useEffect(() => {
    const t = setTimeout(() => setLabelVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // Scroll to bottom on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step, typing, answers]);

  function handleOption(option: string) {
    setSelected(option);

    // Record answer
    const newAnswer: Answer = {
      question: QUESTIONS[step].text.split("\n")[0].replace(/^👋\s*/, ""),
      answer: option,
    };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    // Show typing then advance
    setTimeout(() => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setSelected(null);
        if (step < QUESTIONS.length - 1) {
          setStep((s) => s + 1);
        } else {
          setStep(QUESTIONS.length); // done
          // Redirect after short pause
          setTimeout(() => {
            window.open(buildWhatsAppUrl(newAnswers), "_blank");
          }, 1200);
        }
      }, 1000);
    }, 400);
  }

  function handleOpen() {
    setOpen(true);
    // Reset if re-opening after completion
    if (step === QUESTIONS.length) {
      setStep(0);
      setAnswers([]);
    }
  }

  const isDone = step === QUESTIONS.length;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

      {/* ── Chat popup ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[340px] sm:w-[360px] rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-white/20"
          >
            {/* Header */}
            <div className="bg-[#075e54] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-md flex-shrink-0">
                  <img src="/icon.svg" alt="FF" className="h-6 w-6 brightness-0 invert" />
                </div>
                <div>
                  <p className="text-white font-semibold text-[14px] leading-tight">{AGENT_NAME}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-[#25D366]" />
                    <p className="text-[#a8d5b1] text-[11.5px]">{AGENT_SUBTITLE}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition-colors text-xl leading-none"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Chat body */}
            <div
              className="bg-[#ece5dd] px-4 py-4 space-y-3 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ minHeight: 260, maxHeight: 380 }}
            >
              {/* Show all answered questions + responses */}
              {QUESTIONS.slice(0, isDone ? QUESTIONS.length : step + 1).map((q, i) => (
                <div key={q.id} className="space-y-2">
                  <BotBubble text={q.text} delay={i === step && !isDone ? 0 : 0} />

                  {/* Options — only for current unanswered step */}
                  {i === step && !isDone && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="space-y-1.5 pl-9"
                    >
                      {q.options.map((opt) => (
                        <OptionBtn
                          key={opt}
                          label={opt}
                          selected={selectedOpt === opt}
                          onClick={() => handleOption(opt)}
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* Show selected answer as user bubble */}
                  {answers[i] && (
                    <UserBubble text={answers[i].answer} />
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {typing && <TypingDots />}

              {/* Done state */}
              {isDone && !typing && (
                <BotBubble
                  text={"✅ Thank you! Redirecting you to WhatsApp now...\n\nOur team will get back to you shortly."}
                />
              )}

              <div ref={bottomRef} />
            </div>

            {/* Footer */}
            <div className="bg-[#f0f0f0] px-4 py-2.5 flex items-center justify-center gap-1.5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB row (label + button) ────────────────────────────────────── */}
      <div className="flex items-center gap-3">

        {/* Label */}
        <AnimatePresence>
          {labelVisible && !open && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 shadow-[0_4px_18px_rgba(37,211,102,0.40)] cursor-pointer select-none"
              onClick={handleOpen}
            >
              <span className="h-2 w-2 rounded-full bg-white animate-pulse flex-shrink-0" />
              <span className="text-white font-semibold text-[13px] whitespace-nowrap">
                Chat with us
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp FAB */}
        <motion.button
          onClick={() => (open ? setOpen(false) : handleOpen())}
          aria-label="Chat on WhatsApp"
          // Floating animation
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          className="relative h-[58px] w-[58px] rounded-full bg-[#25D366] shadow-[0_6px_28px_rgba(37,211,102,0.55)] flex items-center justify-center flex-shrink-0 focus:outline-none"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

          {/* WhatsApp icon */}
          <svg viewBox="0 0 24 24" className="h-[30px] w-[30px] fill-white relative z-10">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
