import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, BookOpen, MessageCircle, TrendingUp,
  Trophy, Settings, LogOut, Send, Mic, Brain,
  ChevronRight, Smile, HelpCircle, AlertCircle, Zap,
  Flame, Target, Clock, Lightbulb,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLocation } from "wouter"
import logoImg from "@assets/Brainimage_(1)_1773355004977.png"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: MessageCircle, label: "Chat Learning", path: "/chat", active: true },
  { icon: TrendingUp, label: "Progress", path: "/progress" },
  { icon: Trophy, label: "Achievements", path: "/achievements" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

type Emotion = "Motivated" | "Focused" | "Confused" | "Frustrated" | "Neutral"

interface Message {
  id: number
  role: "user" | "ai"
  text: string
  time: string
  emotion?: Emotion
}

const emotionConfig: Record<Emotion, { color: string; bg: string; icon: typeof Smile; dot: string }> = {
  Motivated: { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30", icon: Smile, dot: "bg-emerald-400" },
  Focused:   { color: "text-cyan-400",    bg: "bg-cyan-400/10 border-cyan-400/30",       icon: Target,        dot: "bg-cyan-400" },
  Confused:  { color: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/30",     icon: HelpCircle,    dot: "bg-amber-400" },
  Frustrated:{ color: "text-rose-400",    bg: "bg-rose-400/10 border-rose-400/30",       icon: AlertCircle,   dot: "bg-rose-400" },
  Neutral:   { color: "text-white/50",    bg: "bg-white/5 border-white/10",              icon: Smile,         dot: "bg-white/40" },
}

const EMOTION_MAP: Record<string, Emotion> = {
  frustrated: "Frustrated",
  confused: "Confused",
  motivated: "Motivated",
  neutral: "Neutral",
}

async function fetchAIResponse(message: string): Promise<{ text: string; emotion: Emotion }> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
  if (!res.ok) throw new Error("API error")
  const data = await res.json() as { emotion: string; reply: string }
  return {
    text: data.reply,
    emotion: EMOTION_MAP[data.emotion] ?? "Neutral",
  }
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    text: "Hello! I'm your EmoLearn AI Tutor. I adapt my teaching style based on how you're feeling. What would you like to learn today?",
    time: getTime(),
    emotion: "Motivated",
  },
]

export default function ChatLearning() {
  const { user, signOut } = useAuth()
  const [, setLocation] = useLocation()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>("Motivated")
  const [sessionMinutes, setSessionMinutes] = useState(0)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Learner"
  const initials = displayName.slice(0, 2).toUpperCase()

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    const timer = setInterval(() => setSessionMinutes((m) => m + 1), 60000)
    return () => clearInterval(timer)
  }, [])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return

    const userMsg: Message = { id: Date.now(), role: "user", text, time: getTime() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    try {
      const response = await fetchAIResponse(text)
      setCurrentEmotion(response.emotion)
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: response.text,
        time: getTime(),
        emotion: response.emotion,
      }
      setMessages((prev) => [...prev, aiMsg])
    } catch {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: "Sorry, I'm having trouble connecting to the AI tutor right now. Please try again in a moment.",
        time: getTime(),
        emotion: "Neutral",
      }
      setMessages((prev) => [...prev, aiMsg])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleLogout = () => { signOut(); setLocation("/") }

  const emo = emotionConfig[currentEmotion]
  const EmoIcon = emo.icon

  return (
    <div className="min-h-screen bg-[#050508] text-white flex overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 z-40 flex flex-col border-r border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
          <img src={logoImg} alt="EmoLearn" className="w-9 h-9" />
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">EmoLearn</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ icon: Icon, label, path, active }) => (
            <button key={label} onClick={() => setLocation(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                       : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? "text-violet-400" : "group-hover:text-white/60"}`} />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-violet-400/60" />}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/5">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-rose-400 hover:bg-rose-400/5 transition-all group">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 ml-64 flex flex-col h-screen">

        {/* Header */}
        <header className="shrink-0 flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl z-30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center">
              <Brain className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">Algebra</p>
              <p className="text-xs text-white/40">AI Tutor Session</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${emo.bg} ${emo.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${emo.dot} animate-pulse`} />
              <EmoIcon className="w-3.5 h-3.5" />
              {currentEmotion}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold">{initials}</div>
              <span className="text-sm text-white/60 hidden sm:block">{displayName}</span>
            </div>
          </div>
        </header>

        {/* Chat + Right Panel */}
        <div className="flex-1 flex overflow-hidden">

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    {msg.role === "ai" ? (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                        <Brain className="w-4 h-4 text-violet-400" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                        {initials}
                      </div>
                    )}

                    <div className={`flex flex-col gap-1 max-w-[70%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-violet-600 text-white rounded-tr-sm"
                          : "bg-white/6 border border-white/8 text-white/90 rounded-tl-sm"
                      }`}>
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-2 px-1">
                        <span className="text-[11px] text-white/25">{msg.time}</span>
                        {msg.emotion && msg.role === "ai" && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${emotionConfig[msg.emotion].bg} ${emotionConfig[msg.emotion].color}`}>
                            {msg.emotion}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                      <Brain className="w-4 h-4 text-violet-400" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/6 border border-white/8 flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400/60"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Input area */}
            <div className="shrink-0 px-6 py-4 border-t border-white/5 bg-black/30 backdrop-blur-sm">
              {/* Emotion bar */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-white/30">Emotion Detected:</span>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${emo.bg} ${emo.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${emo.dot}`} />
                  <EmoIcon className="w-3 h-3" />
                  {currentEmotion}
                </div>
              </div>

              {/* Input box */}
              <div className="relative flex items-end gap-3 p-1.5 rounded-2xl bg-white/5 border border-white/10 focus-within:border-violet-500/40 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    e.target.style.height = "auto"
                    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px"
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask your AI tutor anything..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/25 px-3 py-2 focus:outline-none max-h-[140px]"
                  style={{ height: "38px" }}
                />
                <div className="flex items-center gap-2 pb-1 pr-1 shrink-0">
                  <button className="w-8 h-8 flex items-center justify-center rounded-xl text-white/30 hover:text-white/60 hover:bg-white/8 transition-all">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-900/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Insights Panel ── */}
          <aside className="hidden xl:flex w-72 shrink-0 flex-col border-l border-white/5 bg-black/30 backdrop-blur-sm p-5 gap-5 overflow-y-auto">

            {/* Learning Progress */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-semibold text-white">Learning Progress</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">45%</p>
              <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-white/30 mt-2">Algebra — Chapter 3</p>
            </div>

            {/* Emotion Trend */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Smile className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">Emotion Trend</h3>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${emo.bg} ${emo.color}`}>
                <span className={`w-2 h-2 rounded-full ${emo.dot} animate-pulse`} />
                Mostly {currentEmotion}
              </div>
              <div className="mt-3 space-y-2">
                {(["Motivated", "Focused", "Confused"] as Emotion[]).map((e) => (
                  <div key={e} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${emotionConfig[e].dot}`} />
                    <span className="text-xs text-white/40 flex-1">{e}</span>
                    <div className="w-16 h-1 rounded-full bg-white/8 overflow-hidden">
                      <div className={`h-full rounded-full ${emotionConfig[e].dot} opacity-70`}
                        style={{ width: e === "Motivated" ? "65%" : e === "Focused" ? "50%" : "20%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Session Duration */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-semibold text-white">Session Duration</h3>
              </div>
              <p className="text-3xl font-bold text-white">
                {sessionMinutes < 1 ? "<1" : sessionMinutes} <span className="text-lg font-normal text-white/40">min</span>
              </p>
              <p className="text-xs text-white/30 mt-1">Session started today</p>
            </div>

            {/* Quick Tips */}
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-white">Quick Tips</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Take short breaks when frustration increases.",
                  "Re-read the question slowly before answering.",
                  "Ask the AI tutor to simplify if confused.",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span className="text-xs text-white/50 leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Streak */}
            <div className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-4 flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-400" />
              <div>
                <p className="text-sm font-bold text-white">5 Day Streak 🔥</p>
                <p className="text-xs text-white/40">Keep it going!</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
