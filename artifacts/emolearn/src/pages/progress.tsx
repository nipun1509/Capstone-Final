import { useState } from "react"
import { motion, useMotionValue, useTransform, animate, type Variants } from "framer-motion"
import { useEffect } from "react"
import {
  LayoutDashboard, BookOpen, MessageCircle, TrendingUp,
  Trophy, Settings, LogOut, ChevronRight, Brain,
  Flame, Target, Clock, Star, CheckCircle2, Calendar,
  Smile, HelpCircle, AlertCircle, Zap, Award,
  BarChart2, Activity, Bell, BookMarked,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell,
} from "recharts"
import { useAuth } from "@/context/auth-context"
import { useLocation } from "wouter"
import logoImg from "@assets/Brainimage_(1)_1773355004977.png"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",    path: "/dashboard" },
  { icon: BookOpen,        label: "Courses",       path: "/courses" },
  { icon: MessageCircle,   label: "Chat Learning", path: "/chat" },
  { icon: TrendingUp,      label: "Progress",      path: "/progress", active: true },
  { icon: Trophy,          label: "Achievements",  path: "/achievements" },
  { icon: Settings,        label: "Settings",      path: "/settings" },
]

function AnimatedNumber({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  )
  useEffect(() => {
    const controls = animate(count, value, { duration: 1.6, ease: "easeOut" })
    return controls.stop
  }, [value, count])
  return <><motion.span>{rounded}</motion.span>{suffix}</>
}

const weeklyData = [
  { day: "Mon", lessons: 3, minutes: 45 },
  { day: "Tue", lessons: 5, minutes: 72 },
  { day: "Wed", lessons: 2, minutes: 30 },
  { day: "Thu", lessons: 7, minutes: 95 },
  { day: "Fri", lessons: 4, minutes: 58 },
  { day: "Sat", lessons: 8, minutes: 110 },
  { day: "Sun", lessons: 1, minutes: 20 },
]

const monthlyData = [
  { week: "Week 1", lessons: 18, minutes: 240 },
  { week: "Week 2", lessons: 24, minutes: 310 },
  { week: "Week 3", lessons: 30, minutes: 420 },
  { week: "Week 4", lessons: 27, minutes: 380 },
]

type Emotion = "Motivated" | "Confused" | "Frustrated" | "Focused" | "Neutral"

const emotionInsights: { emotion: Emotion; pct: number; icon: typeof Smile; color: string; bg: string; dot: string }[] = [
  { emotion: "Motivated",  pct: 52, icon: Smile,        color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", dot: "bg-emerald-400" },
  { emotion: "Focused",    pct: 21, icon: Target,       color: "text-cyan-400",    bg: "bg-cyan-400/10 border-cyan-400/20",       dot: "bg-cyan-400" },
  { emotion: "Confused",   pct: 17, icon: HelpCircle,   color: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/20",     dot: "bg-amber-400" },
  { emotion: "Frustrated", pct: 10, icon: AlertCircle,  color: "text-rose-400",    bg: "bg-rose-400/10 border-rose-400/20",       dot: "bg-rose-400" },
]

const aiSuggestions = [
  {
    trigger: "Confused",
    icon: HelpCircle,
    color: "text-amber-400",
    border: "border-amber-400/20",
    bg: "bg-amber-400/5",
    message: "You seem to struggle with Physics concepts. Try reviewing the basics of forces and motion again — a slower pace helps retention.",
  },
  {
    trigger: "Motivated",
    icon: Zap,
    color: "text-violet-400",
    border: "border-violet-400/20",
    bg: "bg-violet-400/5",
    message: "You're on a great streak! Now is a perfect time to push into more advanced Algebra topics — your momentum is high.",
  },
  {
    trigger: "Frustrated",
    icon: Flame,
    color: "text-rose-400",
    border: "border-rose-400/20",
    bg: "bg-rose-400/5",
    message: "When frustration builds, take a 5-minute break. Return fresh — the AI tutor will simplify the next explanation.",
  },
]

interface EnrolledCourse {
  title: string
  subject: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
  lastActivity: string
  gradient: string
  icon: typeof BookOpen
  quizScore: number
}

const enrolledCourses: EnrolledCourse[] = [
  {
    title: "Advanced Algebra",
    subject: "Mathematics",
    progress: 65,
    lessonsCompleted: 16,
    totalLessons: 24,
    lastActivity: "Today",
    gradient: "from-violet-500 to-purple-700",
    icon: Target,
    quizScore: 82,
  },
  {
    title: "Biology Foundations",
    subject: "Science",
    progress: 42,
    lessonsCompleted: 13,
    totalLessons: 30,
    lastActivity: "Yesterday",
    gradient: "from-cyan-500 to-teal-600",
    icon: Brain,
    quizScore: 74,
  },
  {
    title: "Physics Mechanics",
    subject: "Science",
    progress: 28,
    lessonsCompleted: 6,
    totalLessons: 20,
    lastActivity: "3 days ago",
    gradient: "from-pink-500 to-rose-600",
    icon: Zap,
    quizScore: 61,
  },
  {
    title: "World Geography",
    subject: "Geography",
    progress: 80,
    lessonsCompleted: 14,
    totalLessons: 18,
    lastActivity: "Today",
    gradient: "from-green-500 to-emerald-600",
    icon: BookMarked,
    quizScore: 91,
  },
  {
    title: "Organic Chemistry",
    subject: "Chemistry",
    progress: 12,
    lessonsCompleted: 3,
    totalLessons: 28,
    lastActivity: "1 week ago",
    gradient: "from-orange-500 to-amber-600",
    icon: Activity,
    quizScore: 55,
  },
]

const summaryStats = [
  { label: "Courses Started",   value: 5,    suffix: "",     icon: BookOpen,      color: "text-violet-400", bg: "from-violet-500/15 to-purple-500/5" },
  { label: "Courses Completed", value: 1,    suffix: "",     icon: CheckCircle2,  color: "text-emerald-400", bg: "from-emerald-500/15 to-green-500/5" },
  { label: "Total Study Time",  value: 32,   suffix: "h",    icon: Clock,         color: "text-cyan-400",    bg: "from-cyan-500/15 to-blue-500/5" },
  { label: "Avg Quiz Score",    value: 72.6, suffix: "%",    icon: Star,          color: "text-yellow-400",  bg: "from-yellow-500/15 to-amber-500/5" },
]

const milestones = [
  { icon: CheckCircle2, label: "Completed first lesson",  color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", date: "Mar 5" },
  { icon: Flame,        label: "5-day learning streak",   color: "text-orange-400",  bg: "bg-orange-400/10 border-orange-400/20",  date: "Mar 10" },
  { icon: Award,        label: "Quiz score above 80%",    color: "text-yellow-400",  bg: "bg-yellow-400/10 border-yellow-400/20",  date: "Mar 12" },
  { icon: BarChart2,    label: "10 lessons completed",    color: "text-violet-400",  bg: "bg-violet-400/10 border-violet-400/20",  date: "Mar 13" },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0e0e18] border border-white/10 rounded-xl p-3 text-xs shadow-xl">
        <p className="text-white/60 mb-2 font-medium">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-violet-300 font-semibold">{p.value} {p.name}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function Progress() {
  const { user, signOut } = useAuth()
  const [, setLocation] = useLocation()
  const [chartMode, setChartMode] = useState<"weekly" | "monthly">("weekly")

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Learner"
  const initials = displayName.slice(0, 2).toUpperCase()
  const handleLogout = () => { signOut(); setLocation("/") }

  const overallProgress = Math.round(
    enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length
  )
  const chartData = chartMode === "weekly" ? weeklyData : monthlyData
  const chartKey = chartMode === "weekly" ? "day" : "week"

  return (
    <div className="min-h-screen bg-[#050508] text-white flex">

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
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-rose-400 hover:bg-rose-400/5 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">

        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl">
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Learning Progress</h1>
            <p className="text-xs text-white/35">Track your journey across all courses</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Bell className="w-4 h-4 text-white/50" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold">{initials}</div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white leading-tight">{displayName}</p>
                <p className="text-xs text-white/40">{user?.email || ""}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

            {/* ── 1. Overall Progress Hero ── */}
            <motion.div variants={item}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 p-7"
                style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.35) 0%, rgba(6,182,212,0.12) 60%, rgba(0,0,0,0.5) 100%)" }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-violet-500/10 blur-3xl" />
                  <div className="absolute -bottom-16 left-48 w-40 h-40 rounded-full bg-cyan-500/8 blur-3xl" />
                </div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm text-violet-300/70 font-medium mb-1">Overall Completion</p>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                        <AnimatedNumber value={overallProgress} suffix="%" />
                      </h2>
                      <p className="text-white/40 text-sm mt-1">across {enrolledCourses.length} enrolled courses</p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <div className="text-center px-5 py-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-2xl font-bold text-white"><AnimatedNumber value={49} /></p>
                        <p className="text-xs text-white/35 mt-0.5">Lessons Done</p>
                      </div>
                      <div className="text-center px-5 py-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-2xl font-bold text-white"><AnimatedNumber value={5} /></p>
                        <p className="text-xs text-white/35 mt-0.5">Day Streak</p>
                      </div>
                      <div className="text-center px-5 py-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-2xl font-bold text-white"><AnimatedNumber value={32} suffix="h" /></p>
                        <p className="text-xs text-white/35 mt-0.5">Study Time</p>
                      </div>
                    </div>
                  </div>

                  {/* Master progress bar */}
                  <div className="mb-2 flex justify-between text-xs text-white/40">
                    <span>Progress to completion</span>
                    <span>{overallProgress}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: `${overallProgress}%` }}
                      transition={{ duration: 1.8, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── 2. Summary Stats ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {summaryStats.map(({ label, value, suffix, icon: Icon, color, bg }) => (
                <motion.div key={label} variants={item}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`rounded-2xl border border-white/8 p-5 bg-gradient-to-br ${bg}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-white/45 font-medium uppercase tracking-wider">{label}</p>
                    <div className={`w-8 h-8 rounded-xl bg-black/30 flex items-center justify-center ${color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    <AnimatedNumber value={value} suffix={suffix} decimals={value % 1 !== 0 ? 1 : 0} />
                  </p>
                </motion.div>
              ))}
            </div>

            {/* ── 3. Chart + Milestones ── */}
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Chart */}
              <motion.div variants={item} className="lg:col-span-2 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-violet-400" />
                    <h3 className="font-semibold text-white text-sm">Learning Activity</h3>
                  </div>
                  <div className="flex rounded-xl overflow-hidden border border-white/10">
                    {(["weekly", "monthly"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setChartMode(mode)}
                        className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                          chartMode === mode
                            ? "bg-violet-500/30 text-violet-300"
                            : "text-white/35 hover:text-white/60 hover:bg-white/5"
                        }`}
                      >
                        {mode === "weekly" ? "This Week" : "This Month"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -28, bottom: 0 }}>
                      <defs>
                        <linearGradient id="lessonGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="minuteGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey={chartKey} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="lessons" name="lessons" stroke="#8b5cf6" strokeWidth={2} fill="url(#lessonGrad)" dot={{ fill: "#8b5cf6", strokeWidth: 0, r: 3 }} activeDot={{ r: 5, fill: "#8b5cf6" }} />
                      <Area type="monotone" dataKey="minutes" name="min" stroke="#06b6d4" strokeWidth={2} fill="url(#minuteGrad)" dot={{ fill: "#06b6d4", strokeWidth: 0, r: 3 }} activeDot={{ r: 5, fill: "#06b6d4" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-violet-500" />
                    <span className="text-xs text-white/40">Lessons completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                    <span className="text-xs text-white/40">Minutes studied</span>
                  </div>
                </div>
              </motion.div>

              {/* Milestones */}
              <motion.div variants={item} className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <h3 className="font-semibold text-white text-sm">Recent Milestones</h3>
                </div>
                <div className="space-y-3">
                  {milestones.map(({ icon: MIcon, label, color, bg, date }) => (
                    <motion.div
                      key={label}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${bg}`}
                    >
                      <div className={`w-8 h-8 rounded-xl bg-black/20 flex items-center justify-center shrink-0 ${color}`}>
                        <MIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white leading-tight">{label}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-white/25" />
                          <span className="text-[10px] text-white/30">{date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── 4. Enrolled Courses ── */}
            <motion.div variants={item}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                  <h2 className="text-lg font-semibold text-white">Enrolled Courses</h2>
                </div>
                <button
                  onClick={() => setLocation("/courses")}
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                >
                  Browse all <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {enrolledCourses.map((course, i) => {
                  const Icon = course.icon
                  return (
                    <motion.div
                      key={course.title}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                      {/* Icon */}
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-white text-sm truncate">{course.title}</p>
                          <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/35">{course.subject}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-white/35 mb-3">
                          <span className="flex items-center gap-1">
                            <BookMarked className="w-3 h-3" />
                            {course.lessonsCompleted}/{course.totalLessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {course.lastActivity}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400/60" />
                            {course.quizScore}% avg
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${course.gradient}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ duration: 1.2, delay: 0.3 + i * 0.07, ease: "easeOut" }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-white shrink-0">{course.progress}%</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => setLocation("/chat")}
                        className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/6 hover:bg-white/12 border border-white/10 text-xs text-white/60 hover:text-white transition-all"
                      >
                        Continue <ChevronRight className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* ── 5. Emotional Insights ── */}
            <motion.div variants={item}>
              <div className="flex items-center gap-2 mb-4">
                <Smile className="w-4 h-4 text-cyan-400" />
                <h2 className="text-lg font-semibold text-white">Emotional Learning Insights</h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">

                {/* Emotion breakdown */}
                <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6">
                  <h3 className="text-sm font-semibold text-white mb-1">Emotion Distribution</h3>
                  <p className="text-xs text-white/35 mb-5">Based on all chat interactions this month</p>

                  {/* Dominant emotion badge */}
                  <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-emerald-400/8 border border-emerald-400/15">
                    <div className="w-9 h-9 rounded-xl bg-emerald-400/15 flex items-center justify-center">
                      <Smile className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Most Detected Emotion</p>
                      <p className="text-sm font-bold text-emerald-400">Motivated <span className="text-white/30 font-normal">(52% of sessions)</span></p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {emotionInsights.map(({ emotion, pct, icon: EIcon, color, dot }) => (
                      <div key={emotion}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <EIcon className={`w-3.5 h-3.5 ${color}`} />
                            <span className="text-xs text-white/55">{emotion}</span>
                          </div>
                          <span className="text-xs font-semibold text-white">{pct}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${dot}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quiz scores bar chart + AI suggestions */}
                <div className="space-y-4">

                  {/* Quiz score chart */}
                  <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart2 className="w-4 h-4 text-violet-400" />
                      <h3 className="text-sm font-semibold text-white">Quiz Scores by Course</h3>
                    </div>
                    <div className="h-36">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={enrolledCourses.map(c => ({ name: c.title.split(" ")[0], score: c.quizScore }))} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="score" name="score" radius={[6, 6, 0, 0]}>
                            {enrolledCourses.map((_, index) => (
                              <Cell key={index} fill={
                                [
                                  "#8b5cf6", "#06b6d4", "#f43f5e", "#10b981", "#f97316",
                                ][index % 5]
                              } fillOpacity={0.8} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* AI Tutor Suggestions */}
                  <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-4 h-4 text-violet-400" />
                      <h3 className="text-sm font-semibold text-white">AI Tutor Suggestions</h3>
                    </div>
                    {aiSuggestions.map(({ icon: SIcon, color, border, bg, message }, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className={`flex gap-3 p-3 rounded-xl border ${bg} ${border}`}
                      >
                        <SIcon className={`w-4 h-4 mt-0.5 shrink-0 ${color}`} />
                        <p className="text-xs text-white/55 leading-relaxed">{message}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
