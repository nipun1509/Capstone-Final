import { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate, type Variants } from "framer-motion"
import {
  LayoutDashboard, BookOpen, MessageCircle, TrendingUp,
  Trophy, Settings, LogOut, Bell, Search, Brain,
  Zap, Star, Play, ChevronRight, Flame, Target,
  Smile, HelpCircle, AlertCircle, CheckCircle2,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLocation } from "wouter"
import logoImg from "@assets/Brainimage_(1)_1773355004977.png"

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v * 10) / 10)
  useEffect(() => {
    const controls = animate(count, value, { duration: 1.6, ease: "easeOut" })
    return controls.stop
  }, [value, count])
  return <><motion.span>{rounded}</motion.span>{suffix}</>
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: MessageCircle, label: "Chat Learning", path: "/chat" },
  { icon: TrendingUp, label: "Progress", path: "/progress" },
  { icon: Trophy, label: "Achievements", path: "/achievements" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

const courses = [
  { title: "Algebra", progress: 65, color: "from-violet-500 to-purple-700", icon: Target },
  { title: "Biology", progress: 42, color: "from-cyan-500 to-blue-600", icon: Brain },
  { title: "Physics", progress: 28, color: "from-pink-500 to-rose-600", icon: Zap },
]

const emotions = [
  { label: "Motivated", pct: 65, color: "bg-emerald-400", icon: Smile },
  { label: "Confusion", pct: 20, color: "bg-amber-400", icon: HelpCircle },
  { label: "Frustration", pct: 15, color: "bg-rose-400", icon: AlertCircle },
]

const achievements = [
  { icon: CheckCircle2, label: "First Lesson Completed", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  { icon: Flame, label: "5 Day Learning Streak", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20" },
  { icon: BookOpen, label: "Course Explorer", color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/20" },
]

const stats = [
  { label: "Learning Progress", value: 40, suffix: "%", icon: TrendingUp, color: "from-violet-500/20 to-purple-500/10", iconColor: "text-violet-400" },
  { label: "Active Courses", value: 3, suffix: "", icon: BookOpen, color: "from-cyan-500/20 to-blue-500/10", iconColor: "text-cyan-400" },
  { label: "Learning Streak", value: 5, suffix: " days", icon: Flame, color: "from-orange-500/20 to-amber-500/10", iconColor: "text-orange-400" },
  { label: "Emotion Insights", value: null, icon: Smile, color: "from-emerald-500/20 to-green-500/10", iconColor: "text-emerald-400", text: "Focused" },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const [, setLocation] = useLocation()
  const [chatStarted, setChatStarted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = () => {
    signOut()
    setLocation("/")
  }

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Learner"

  const initials = displayName.slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-[#050508] text-white flex">

      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 z-40 flex flex-col border-r border-white/5 bg-black/60 backdrop-blur-xl">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
          <img src={logoImg} alt="EmoLearn" className="w-9 h-9" />
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">EmoLearn</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ icon: Icon, label, active, path }) => (
            <button
              key={label}
              onClick={() => path && setLocation(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? "text-violet-400" : "group-hover:text-white/60"}`} />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-violet-400/60" />}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-rose-400 hover:bg-rose-400/5 transition-all group"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">

        {/* Top Nav */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, topics…"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Bell className="w-4 h-4 text-white/50" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                {initials}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white leading-tight">{displayName}</p>
                <p className="text-xs text-white/40">{user?.email || ""}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

            {/* Welcome Card */}
            <motion.div variants={item}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 p-7"
                style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.35) 0%, rgba(6,182,212,0.15) 60%, rgba(0,0,0,0.5) 100%)" }}>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-violet-500/10 blur-3xl" />
                  <div className="absolute -bottom-12 right-32 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl" />
                </div>
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  <div>
                    <p className="text-sm text-violet-300/80 font-medium mb-1">Good day, {displayName} 👋</p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome back to EmoLearn</h1>
                    <p className="text-white/50 text-sm">Continue your emotion-aware learning journey.</p>
                  </div>
                  <div className="flex flex-wrap gap-3 shrink-0">
                    <button onClick={() => setLocation("/chat")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-violet-900/40">
                      <MessageCircle className="w-4 h-4" /> Start Chat Learning
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-colors">
                      <BookOpen className="w-4 h-4" /> Explore Courses
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(({ label, value, suffix, icon: Icon, color, iconColor, text }) => (
                <motion.div key={label} variants={item}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`rounded-2xl border border-white/8 p-5 bg-gradient-to-br ${color} backdrop-blur-sm`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-white/50 font-medium uppercase tracking-wider">{label}</p>
                    <div className={`w-8 h-8 rounded-xl bg-black/30 flex items-center justify-center ${iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {value !== null
                      ? <AnimatedNumber value={value} suffix={suffix || ""} />
                      : text
                    }
                  </p>
                  {label === "Learning Progress" && (
                    <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-violet-400"
                        initial={{ width: 0 }}
                        animate={{ width: "40%" }}
                        transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Two-column layout */}
            <div className="grid lg:grid-cols-5 gap-6">

              {/* Continue Learning */}
              <motion.div variants={item} className="lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Continue Learning</h2>
                  <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-3">
                  {courses.map(({ title, progress, color, icon: CourseIcon }) => (
                    <motion.div
                      key={title}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-5 flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                          <CourseIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm truncate">{title}</p>
                          <p className="text-xs text-white/40">{progress}% complete</p>
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 text-xs text-white/70 hover:text-white transition-all whitespace-nowrap">
                          <Play className="w-3 h-3" /> Continue
                        </button>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right column */}
              <div className="lg:col-span-2 space-y-4">

                {/* AI Tutor */}
                <motion.div variants={item}>
                  <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 to-purple-600/5 p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-violet-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">AI Tutor Chat</h3>
                        <p className="text-xs text-white/40">Emotion-aware assistant</p>
                      </div>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Ask questions and receive emotion-aware explanations from your AI learning assistant.
                    </p>
                    <button
                      onClick={() => setLocation("/chat")}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-violet-900/30"
                    >
                      <Zap className="w-4 h-4" />
                      Start Chat Session
                    </button>
                    {chatStarted && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl bg-black/30 border border-white/8 p-3"
                      >
                        <p className="text-xs text-white/50 mb-1.5">AI Tutor</p>
                        <p className="text-sm text-white/80">Hello {displayName}! I'm your EmoLearn AI tutor. I can sense when you're confused or frustrated and adjust my explanations. What would you like to learn today?</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Emotion Analytics */}
                <motion.div variants={item}>
                  <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
                    <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                      <Smile className="w-4 h-4 text-cyan-400" />
                      Emotion Analytics
                    </h3>
                    <div className="space-y-3">
                      {emotions.map(({ label, pct, color, icon: EmoIcon }) => (
                        <div key={label}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <EmoIcon className={`w-3.5 h-3.5 ${color.replace("bg-", "text-")}`} />
                              <span className="text-xs text-white/60">{label}</span>
                            </div>
                            <span className="text-xs font-semibold text-white">{pct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${color}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Achievements */}
            <motion.div variants={item}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Achievements</h2>
                <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {achievements.map(({ icon: AchIcon, label, color, bg }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`rounded-2xl border p-5 flex items-center gap-4 ${bg}`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center shrink-0 ${color}`}>
                      <AchIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">{label}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-white/40">Earned</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="EmoLearn" className="w-5 h-5 opacity-60" />
            <span className="text-xs text-white/30">© 2025 EmoLearn</span>
          </div>
          <nav className="flex flex-wrap gap-4">
            {["Features", "Technology", "Contact", "About"].map((link) => (
              <a key={link} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">{link}</a>
            ))}
          </nav>
        </footer>
      </div>
    </div>
  )
}
