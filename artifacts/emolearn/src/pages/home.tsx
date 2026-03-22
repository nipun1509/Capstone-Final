import { useRef, useState } from "react"
import logoImg from "@assets/Brainimage_(1)_1773355004977.png"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { AuthUI } from "@/components/ui/auth-fuse"
import { useLocation } from "wouter"
import { useAuth } from "@/context/auth-context"
import {
  Brain,
  MessageCircle,
  TrendingUp,
  User,
  Zap,
  Shield,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  BookOpen,
  BarChart2,
  Layers,
  Cpu,
  Code2,
  Bot,
  ArrowRight,
  Star,
  Check,
  Trophy,
} from "lucide-react"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particles-typography"

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const features = [
  {
    icon: Brain,
    title: "Emotion Detection",
    desc: "Detects student emotions using NLP-based sentiment analysis in real time.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "AI Learning Engine",
    desc: "Adjusts explanations and content based on detected emotional state.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageCircle,
    title: "Chatbot Tutor",
    desc: "Interactive AI chatbot that guides students through learning sessions.",
    color: "from-teal-500 to-green-500",
  },
  {
    icon: Layers,
    title: "Adaptive Learning",
    desc: "Difficulty and explanations dynamically change based on student responses.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    desc: "Monitor learning milestones, achievements, and engagement metrics.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: User,
    title: "Personalized Learning",
    desc: "Every student receives a fully customized learning experience.",
    color: "from-indigo-500 to-violet-500",
  },
]

const steps = [
  { num: "01", title: "Student interacts with chatbot", desc: "The student begins a learning session through the conversational AI interface." },
  { num: "02", title: "Emotion detection model analyzes text", desc: "NLP model reads the student's messages and identifies emotional signals." },
  { num: "03", title: "AI learning engine processes emotion", desc: "The engine maps detected emotion to the optimal teaching strategy." },
  { num: "04", title: "System adapts explanation", desc: "Content difficulty, tone, and style are adjusted in real time." },
  { num: "05", title: "Student continues with better understanding", desc: "The student receives a personalized response and learns more effectively." },
]

const techStack = [
  { icon: Code2, title: "Frontend", stack: "React + Tailwind CSS", color: "text-cyan-400" },
  { icon: Cpu, title: "Backend", stack: "Node.js / Python API", color: "text-green-400" },
  { icon: Brain, title: "Machine Learning", stack: "NLP Emotion Detection", color: "text-violet-400" },
  { icon: Bot, title: "AI Interaction", stack: "Chatbot Conversational Interface", color: "text-amber-400" },
]

const previews = [
  { icon: BarChart2, title: "Dashboard", desc: "Overview of progress and engagement" },
  { icon: BookOpen, title: "Course Interface", desc: "Structured learning content" },
  { icon: MessageCircle, title: "Chat Learning", desc: "Conversational AI tutoring" },
  { icon: Brain, title: "Emotion Indicator", desc: "Real-time emotional state display" },
  { icon: TrendingUp, title: "Progress Analytics", desc: "Detailed student insights" },
]

const benefits = [
  "Emotion-aware education that responds to how you feel",
  "Adaptive learning approach that never stays static",
  "AI tutor available 24/7, always ready to help",
  "Better engagement through personalized interaction",
]

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false)
  const [, setLocation] = useLocation()
  const { signIn } = useAuth()

  const handleAuthSuccess = (email: string, name?: string) => {
    signIn(email, name)
    setAuthOpen(false)
    setLocation("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* Auth Modal */}
      <AnimatePresence>
        {authOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setAuthOpen(false) }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              style={{ maxHeight: "90vh" }}
            >
              <button
                onClick={() => setAuthOpen(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                aria-label="Close"
              >
                ✕
              </button>
              <AuthUI onSuccess={handleAuthSuccess} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <WebGLShader />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/30 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="EmoLearn logo" className="w-16 h-16 object-contain" />
          <span className="font-bold text-white text-lg tracking-tight">EmoLearn</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how" className="hover:text-white transition-colors">How it Works</a>
          <a href="#tech" className="hover:text-white transition-colors">Technology</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <button onClick={() => setAuthOpen(true)} className="hidden md:flex items-center gap-2 text-sm text-white/80 border border-white/20 rounded-full px-4 py-1.5 hover:border-white/40 transition-all backdrop-blur-sm">
          Get Started <ArrowRight className="w-3 h-3" />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
            <p className="text-xs text-green-400 font-medium">AI Learning Assistant Active</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full mb-2"
          >
            <CursorDrivenParticleTypography
              segments={[
                { text: "Emo", color: "#ffffff" },
                { text: "Learn", gradient: { from: "#a78bfa", via: "#22d3ee", to: "#60a5fa" } },
              ]}
              fontSize={160}
              fontFamily="Inter, sans-serif"
              particleSize={1.6}
              particleDensity={5}
              dispersionStrength={20}
              returnSpeed={0.08}
              className="h-[150px] md:h-[200px] lg:h-[220px] min-h-0"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-xl md:text-2xl font-light text-white/70 mb-4 tracking-wide"
          >
            AI-Powered Emotion Aware Learning Platform
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-sm md:text-base text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A smart learning system that understands student emotions such as frustration, confusion, and motivation, and adapts the teaching experience in real time through an intelligent chatbot tutor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex items-center gap-4 flex-wrap justify-center"
          >
            <div className="relative border border-white/20 p-1.5 rounded-full backdrop-blur-sm">
              <LiquidButton onClick={() => setAuthOpen(true)} className="text-white border border-white/30 rounded-full font-semibold" size="xl">
                Start Learning
              </LiquidButton>
            </div>
            <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group">
              Explore Platform <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Glow arc at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-96 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-radial from-violet-600/20 via-cyan-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-r from-violet-500/30 via-blue-500/40 to-cyan-500/30 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Problem */}
      <section className="relative z-10 py-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="text-xs tracking-widest text-violet-400 uppercase font-semibold mb-4 block">The Problem</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Education ignores how you feel
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              Traditional learning platforms deliver the same content regardless of whether students are frustrated, confused, or disengaged. This leads to loss of motivation, poor retention, and students falling behind — not because they lack intelligence, but because the system doesn't adapt to them.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "67%", label: "Students feel disengaged in digital courses" },
              { stat: "43%", label: "Drop out due to frustration & confusion" },
              { stat: "2x", label: "Better outcomes with personalized learning" },
            ].map((item) => (
              <div key={item.stat} className="bg-white/5 rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
                <div className="text-4xl font-black text-white mb-2">{item.stat}</div>
                <p className="text-sm text-white/50">{item.label}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Solution */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-black via-violet-950/20 to-black">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-xs tracking-widest text-cyan-400 uppercase font-semibold mb-4 block">Our Solution</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">EmoLearn</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              EmoLearn combines AI, Machine Learning, and emotion detection to create fully adaptive learning experiences. It reads how students feel and transforms the teaching approach in real time — making digital education truly human-aware.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-600/10" />
            <div className="relative grid md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Brain, label: "Emotion AI", sub: "Reads student state" },
                { icon: ArrowRight, label: "Adaptive Engine", sub: "Maps emotion to strategy" },
                { icon: BookOpen, label: "Personalized Output", sub: "Tailored explanation" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-white/70" />
                  </div>
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="text-sm text-white/40 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-xs tracking-widest text-violet-400 uppercase font-semibold mb-4 block">Key Features</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Everything you need to learn smarter</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${f.color}`} />
                  <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="relative z-10 font-semibold text-white mb-2">{f.title}</h3>
                  <p className="relative z-10 text-sm text-white/70 leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 py-32 px-6 bg-gradient-to-b from-black via-blue-950/20 to-black">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-xs tracking-widest text-blue-400 uppercase font-semibold mb-4 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">From emotion to understanding</h2>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-blue-500 to-transparent hidden md:block" />
            <div className="space-y-8">
              {steps.map((step, i) => (
                <FadeIn key={step.num} delay={i * 0.1}>
                  <div className="flex gap-6 items-start group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white border-2 border-black relative z-10">
                      {step.num}
                    </div>
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-5 flex-1 hover:border-white/20 transition-all group-hover:-translate-y-0.5 duration-200">
                      <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-white/50">{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="relative z-10 py-32 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-xs tracking-widest text-green-400 uppercase font-semibold mb-4 block">Technology Stack</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Built with modern technology</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {techStack.map((t, i) => (
              <FadeIn key={t.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center hover:border-white/20 transition-all hover:-translate-y-1 duration-300">
                  <t.icon className={`w-8 h-8 mx-auto mb-3 ${t.color}`} />
                  <h3 className="font-semibold text-white mb-1">{t.title}</h3>
                  <p className="text-xs text-white/40">{t.stack}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Preview */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-black via-violet-950/10 to-black">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-xs tracking-widest text-violet-400 uppercase font-semibold mb-4 block">Platform Preview</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">See what's inside</h2>
            <p className="text-white/40 mt-4 text-base max-w-xl mx-auto">A glimpse into every screen of your emotion-aware learning experience.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: BarChart2,    title: "Dashboard",          desc: "Overview of your progress and engagement",  gradient: "from-violet-500 to-purple-600",  bg: "from-violet-950/50 to-purple-950/50",  hover: "hover:border-violet-500/30" },
              { icon: BookOpen,     title: "Course Interface",   desc: "Structured, topic-by-topic learning content", gradient: "from-cyan-500 to-blue-600",     bg: "from-cyan-950/50 to-blue-950/50",      hover: "hover:border-cyan-500/30" },
              { icon: MessageCircle,title: "Chat Learning",      desc: "Conversational AI tutoring in real time",    gradient: "from-teal-500 to-emerald-600",   bg: "from-teal-950/50 to-emerald-950/50",   hover: "hover:border-teal-500/30" },
              { icon: Brain,        title: "Emotion Indicator",  desc: "See your live emotional state at a glance",  gradient: "from-amber-500 to-orange-600",   bg: "from-amber-950/50 to-orange-950/50",   hover: "hover:border-amber-500/30" },
              { icon: TrendingUp,   title: "Progress Analytics", desc: "Detailed insights into your learning journey",gradient: "from-pink-500 to-rose-600",     bg: "from-pink-950/50 to-rose-950/50",      hover: "hover:border-pink-500/30" },
              { icon: Trophy,       title: "Achievements",       desc: "Badges, XP, and milestones you have earned", gradient: "from-yellow-500 to-amber-500",   bg: "from-yellow-950/50 to-amber-950/50",   hover: "hover:border-yellow-500/30" },
            ].map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <div className={`group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden ${p.hover} transition-all duration-300 hover:-translate-y-1`}>
                  <div className={`h-36 bg-gradient-to-br ${p.bg} flex items-center justify-center`}>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <p.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white text-sm">{p.title}</h3>
                    <p className="text-xs text-white/40 mt-0.5">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="relative z-10 py-32 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="text-xs tracking-widest text-cyan-400 uppercase font-semibold mb-4 block">Why EmoLearn is Different</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Learning that truly understands you
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                Most platforms treat every student the same. EmoLearn treats every student as an individual — detecting their emotional state and adapting teaching on the fly.
              </p>
              <ul className="space-y-4">
                {benefits.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-sm text-white/70"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    {b}
                  </motion.li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-600/10" />
                <div className="relative space-y-4">
                  {["Emotion Aware", "Adaptive Speed", "Always Available", "Student Focused"].map((tag, i) => (
                    <div key={tag} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${i % 2 === 0 ? "from-violet-400 to-blue-400" : "from-cyan-400 to-teal-400"}`} />
                      <span className="text-white/70 font-medium text-sm">{tag}</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                      <Star className="w-3 h-3 text-amber-400/60" />
                    </div>
                  ))}
                  <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                    {[
                      { label: "Accuracy", val: "94%" },
                      { label: "Engagement", val: "+78%" },
                      { label: "Completion", val: "+65%" },
                      { label: "Satisfaction", val: "4.9/5" },
                    ].map((m) => (
                      <div key={m.label}>
                        <p className="text-2xl font-bold text-white">{m.val}</p>
                        <p className="text-xs text-white/40">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-black via-violet-950/15 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="text-xs tracking-widest text-violet-400 uppercase font-semibold mb-4 block">Project Vision</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              The future of digital education
            </h2>
            <p className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
              EmoLearn aims to make digital education more human-like by understanding student emotions and delivering personalized learning experiences. We believe every student deserves a tutor that listens — not just to their questions, but to how they feel asking them.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Team / Project Info */}
      <section className="relative z-10 py-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-xs tracking-widest text-amber-400 uppercase font-semibold mb-4 block">About The Project</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Capstone Project</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Intelligent Learning Assistant</h3>
              <p className="text-white/50 leading-relaxed max-w-xl mx-auto mb-6">
                EmoLearn is a capstone project focused on building an intelligent learning assistant powered by emotion detection and adaptive AI. The goal is to bridge the gap between traditional education platforms and truly personalized learning at scale.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {["AI/ML Research", "NLP Engineering", "Full Stack Dev", "UX Design"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60">{tag}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-black to-violet-950/20">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Ready to learn smarter?
            </h2>
            <p className="text-white/50 mb-10 text-lg">
              Join EmoLearn and experience education that adapts to you — not the other way around.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="relative border border-white/20 p-1.5 rounded-full">
                <LiquidButton onClick={() => setAuthOpen(true)} className="text-white border border-white/30 rounded-full font-semibold" size="xl">
                  Start Learning Free
                </LiquidButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 border-t border-white/10 bg-black px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="EmoLearn logo" className="w-7 h-7 object-contain" />
              <span className="font-bold text-white">EmoLearn</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#tech" className="hover:text-white transition-colors">Technology</a>
              <a href="#how" className="hover:text-white transition-colors">How it Works</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/30 hover:text-white/70 transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#" className="text-white/30 hover:text-white/70 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="text-white/30 hover:text-white/70 transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-white/20">
            © 2026 EmoLearn. AI-Powered Emotion Aware Learning Platform. Capstone Project.
          </div>
        </div>
      </footer>
    </div>
  )
}
