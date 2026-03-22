import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion"
import {
  LayoutDashboard, BookOpen, MessageCircle, TrendingUp,
  Trophy, Settings, LogOut, ChevronRight, Brain,
  Flame, Star, CheckCircle2, Lock, Zap, Bell,
  BookMarked, MessageSquare, Calculator, Target,
  Award, Crown, Sparkles, Clock, Shield,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLocation } from "wouter"
import logoImg from "@assets/Brainimage_(1)_1773355004977.png"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",    path: "/dashboard" },
  { icon: BookOpen,        label: "Courses",       path: "/courses" },
  { icon: MessageCircle,   label: "Chat Learning", path: "/chat" },
  { icon: TrendingUp,      label: "Progress",      path: "/progress" },
  { icon: Trophy,          label: "Achievements",  path: "/achievements", active: true },
  { icon: Settings,        label: "Settings",      path: "/settings" },
]

type BadgeRarity = "common" | "rare" | "epic" | "legendary"

interface Achievement {
  id: number
  icon: typeof Trophy
  title: string
  description: string
  unlocked: boolean
  rarity: BadgeRarity
  xp: number
  unlockedDate?: string
  gradient: string
  glow: string
  category: string
}

const achievements: Achievement[] = [
  {
    id: 1,
    icon: Star,
    title: "First Step",
    description: "Completed your very first lesson.",
    unlocked: true,
    rarity: "common",
    xp: 50,
    unlockedDate: "Mar 5",
    gradient: "from-yellow-400 to-amber-500",
    glow: "shadow-yellow-500/40",
    category: "Learning",
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "AI Partner",
    description: "Used the AI tutor 20 times.",
    unlocked: true,
    rarity: "rare",
    xp: 150,
    unlockedDate: "Mar 8",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/40",
    category: "Interaction",
  },
  {
    id: 3,
    icon: Flame,
    title: "5-Day Streak",
    description: "Studied 5 days in a row.",
    unlocked: true,
    rarity: "rare",
    xp: 200,
    unlockedDate: "Mar 10",
    gradient: "from-orange-500 to-red-600",
    glow: "shadow-orange-500/40",
    category: "Consistency",
  },
  {
    id: 4,
    icon: Award,
    title: "Quiz Champion",
    description: "Scored above 80% on any quiz.",
    unlocked: true,
    rarity: "rare",
    xp: 250,
    unlockedDate: "Mar 12",
    gradient: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/40",
    category: "Performance",
  },
  {
    id: 5,
    icon: Calculator,
    title: "Math Explorer",
    description: "Completed 50% of the Algebra course.",
    unlocked: true,
    rarity: "epic",
    xp: 400,
    unlockedDate: "Mar 14",
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/40",
    category: "Courses",
  },
  {
    id: 6,
    icon: Target,
    title: "Problem Solver",
    description: "Solved 10 practice problems correctly.",
    unlocked: true,
    rarity: "common",
    xp: 100,
    unlockedDate: "Mar 13",
    gradient: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/40",
    category: "Performance",
  },
  {
    id: 7,
    icon: Shield,
    title: "Resilient Learner",
    description: "Kept going after 3 frustrated sessions.",
    unlocked: false,
    rarity: "epic",
    xp: 350,
    gradient: "from-indigo-500 to-violet-700",
    glow: "shadow-indigo-500/40",
    category: "Mindset",
  },
  {
    id: 8,
    icon: Flame,
    title: "Consistency Master",
    description: "Studied 7 days in a row.",
    unlocked: false,
    rarity: "epic",
    xp: 500,
    gradient: "from-orange-600 to-red-700",
    glow: "shadow-orange-600/40",
    category: "Consistency",
  },
  {
    id: 9,
    icon: BookMarked,
    title: "Course Finisher",
    description: "Completed an entire course.",
    unlocked: false,
    rarity: "legendary",
    xp: 1000,
    gradient: "from-yellow-400 via-amber-500 to-orange-600",
    glow: "shadow-yellow-400/50",
    category: "Courses",
  },
  {
    id: 10,
    icon: Crown,
    title: "EmoLearn Master",
    description: "Unlocked all other achievements.",
    unlocked: false,
    rarity: "legendary",
    xp: 2000,
    gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
    glow: "shadow-fuchsia-500/50",
    category: "Prestige",
  },
  {
    id: 11,
    icon: Brain,
    title: "Deep Thinker",
    description: "Spent over 30 hours studying.",
    unlocked: true,
    rarity: "rare",
    xp: 300,
    unlockedDate: "Mar 15",
    gradient: "from-sky-500 to-cyan-600",
    glow: "shadow-sky-500/40",
    category: "Learning",
  },
  {
    id: 12,
    icon: Zap,
    title: "Speed Learner",
    description: "Completed 5 lessons in one day.",
    unlocked: false,
    rarity: "common",
    xp: 120,
    gradient: "from-lime-400 to-green-600",
    glow: "shadow-lime-400/40",
    category: "Learning",
  },
]

const rarityConfig: Record<BadgeRarity, { label: string; color: string; border: string; bg: string }> = {
  common:    { label: "Common",    color: "text-slate-300",  border: "border-slate-400/30",  bg: "bg-slate-400/10" },
  rare:      { label: "Rare",      color: "text-blue-400",   border: "border-blue-400/30",   bg: "bg-blue-400/10" },
  epic:      { label: "Epic",      color: "text-violet-400", border: "border-violet-400/30", bg: "bg-violet-400/10" },
  legendary: { label: "Legendary", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10" },
}

const timelineEvents = [
  { icon: Star,         title: "Unlocked: First Step",              sub: "Completed your first lesson",           date: "Mar 5",  color: "text-yellow-400",  bg: "bg-yellow-400/10 border-yellow-400/20" },
  { icon: MessageSquare,title: "First Chat with AI Tutor",          sub: "Started your first tutor session",      date: "Mar 6",  color: "text-violet-400",  bg: "bg-violet-400/10 border-violet-400/20" },
  { icon: Target,       title: "Solved 5 Questions in a Row",       sub: "Accuracy streak during practice",       date: "Mar 9",  color: "text-pink-400",    bg: "bg-pink-400/10 border-pink-400/20" },
  { icon: Flame,        title: "Unlocked: 5-Day Streak",            sub: "Studied every day for 5 days",          date: "Mar 10", color: "text-orange-400",  bg: "bg-orange-400/10 border-orange-400/20" },
  { icon: Award,        title: "Unlocked: Quiz Champion",           sub: "Scored 91% on Geography quiz",          date: "Mar 12", color: "text-cyan-400",    bg: "bg-cyan-400/10 border-cyan-400/20" },
  { icon: Calculator,   title: "Unlocked: Math Explorer",           sub: "Reached 50% in Advanced Algebra",       date: "Mar 14", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  { icon: Brain,        title: "Unlocked: Deep Thinker",            sub: "Crossed 30 hours of total study time",  date: "Mar 15", color: "text-sky-400",     bg: "bg-sky-400/10 border-sky-400/20" },
]

const nextAchievements = [
  {
    icon: Flame,
    title: "Consistency Master",
    description: "Study 7 days in a row",
    current: 5,
    total: 7,
    gradient: "from-orange-500 to-red-600",
    xp: 500,
  },
  {
    icon: BookMarked,
    title: "Course Finisher",
    description: "Complete an entire course",
    current: 80,
    total: 100,
    gradient: "from-yellow-400 to-amber-500",
    xp: 1000,
    unit: "%",
    course: "World Geography",
  },
  {
    icon: Target,
    title: "Problem Solver +",
    description: "Solve 25 practice problems",
    current: 10,
    total: 25,
    gradient: "from-pink-500 to-rose-600",
    xp: 350,
  },
]

const categories = ["All", "Learning", "Consistency", "Performance", "Courses", "Interaction", "Mindset", "Prestige"]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const cardAnim: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
}

function TimelineItem({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const Icon = event.icon
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex gap-4 relative"
    >
      {/* Line */}
      {index < timelineEvents.length - 1 && (
        <div className="absolute left-5 top-10 bottom-0 w-px bg-white/6 z-0" />
      )}
      {/* Dot */}
      <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 z-10 ${event.bg} ${event.color}`}>
        <Icon className="w-4 h-4" />
      </div>
      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="rounded-xl border border-white/8 bg-white/3 backdrop-blur-sm px-4 py-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white leading-tight">{event.title}</p>
            <p className="text-xs text-white/40 mt-0.5">{event.sub}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-[10px] text-white/25 pt-0.5">
            <Clock className="w-3 h-3" />
            {event.date}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function BadgeCard({ ach }: { ach: Achievement }) {
  const [hovered, setHovered] = useState(false)
  const Icon = ach.icon
  const rarity = rarityConfig[ach.rarity]

  return (
    <motion.div
      variants={cardAnim}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={ach.unlocked ? { y: -6, scale: 1.03 } : { scale: 1.01 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className={`relative rounded-2xl border overflow-hidden flex flex-col items-center text-center p-6 gap-3 transition-shadow duration-300 ${
        ach.unlocked
          ? `border-white/12 bg-white/4 backdrop-blur-sm ${hovered ? `shadow-2xl ${ach.glow}` : ""}`
          : "border-white/5 bg-white/2"
      }`}
    >
      {/* Rarity glow ring */}
      {ach.unlocked && ach.rarity !== "common" && (
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${ach.gradient} opacity-0 pointer-events-none`}
          animate={hovered ? { opacity: 0.08 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Legendary shimmer */}
      {ach.unlocked && ach.rarity === "legendary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
        />
      )}

      {/* Badge icon */}
      <div className="relative">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
          ach.unlocked
            ? `bg-gradient-to-br ${ach.gradient} shadow-lg ${ach.glow}`
            : "bg-white/6 border border-white/8"
        }`}>
          {ach.unlocked ? (
            <Icon className="w-7 h-7 text-white" />
          ) : (
            <Lock className="w-6 h-6 text-white/20" />
          )}
        </div>

        {/* Unlock glow pulse (unlocked only) */}
        {ach.unlocked && (
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${ach.gradient} blur-lg -z-10`}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Rarity badge */}
      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${rarity.bg} ${rarity.border} ${rarity.color}`}>
        {rarity.label}
      </span>

      {/* Title */}
      <p className={`font-bold text-sm leading-tight ${ach.unlocked ? "text-white" : "text-white/25"}`}>
        {ach.title}
      </p>

      {/* Description */}
      <p className={`text-xs leading-relaxed ${ach.unlocked ? "text-white/45" : "text-white/20"}`}>
        {ach.description}
      </p>

      {/* XP + date */}
      <div className="flex items-center gap-3 mt-auto pt-1">
        <div className={`flex items-center gap-1 text-xs font-semibold ${ach.unlocked ? "text-yellow-400" : "text-white/15"}`}>
          <Sparkles className="w-3 h-3" />
          +{ach.xp} XP
        </div>
        {ach.unlockedDate && (
          <div className="flex items-center gap-1 text-[10px] text-white/25">
            <CheckCircle2 className="w-3 h-3 text-emerald-400/60" />
            {ach.unlockedDate}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Achievements() {
  const { user, signOut } = useAuth()
  const [, setLocation] = useLocation()
  const [activeCategory, setActiveCategory] = useState("All")

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Learner"
  const initials = displayName.slice(0, 2).toUpperCase()
  const handleLogout = () => { signOut(); setLocation("/") }

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalXP = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xp, 0)

  const filtered = achievements.filter(
    (a) => activeCategory === "All" || a.category === activeCategory
  )

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
            <h1 className="text-lg font-bold text-white leading-tight">Achievements</h1>
            <p className="text-xs text-white/35">Your gamified learning rewards</p>
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

        <main className="flex-1 p-6 space-y-8 overflow-y-auto">

          {/* ── 1. Hero Banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-white/10 p-8 text-center"
            style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.5) 0%, rgba(236,72,153,0.2) 50%, rgba(6,182,212,0.15) 100%)" }}
          >
            {/* Background grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="ach-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ach-grid)" />
              </svg>
            </div>
            {/* Orbs */}
            <motion.div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-violet-500/15 blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-pink-500/10 blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
            <motion.div className="absolute top-8 right-32 w-32 h-32 rounded-full bg-cyan-500/8 blur-2xl pointer-events-none"
              animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />

            <div className="relative z-10">
              {/* Trophy icon */}
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 rounded-3xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-2xl shadow-yellow-500/40"
                    animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>
                  {/* Glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-yellow-400/30 blur-xl -z-10"
                    animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Sparkles */}
                  {[
                    { top: "-8px", right: "-8px", delay: 0 },
                    { top: "4px", left: "-14px", delay: 0.5 },
                    { bottom: "-6px", right: "-10px", delay: 1 },
                  ].map((pos, i) => (
                    <motion.div key={i} className="absolute w-4 h-4 text-yellow-300"
                      style={{ top: pos.top, right: pos.right, left: pos.left, bottom: pos.bottom }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: pos.delay }}
                    >
                      <Star className="w-4 h-4 fill-yellow-300" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
                Your Learning Achievements
              </h1>
              <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed mb-7">
                Every step you take in learning unlocks new milestones. Keep pushing forward — your journey is just beginning.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { label: "Unlocked",      value: `${unlockedCount}/${achievements.length}`, icon: CheckCircle2, color: "text-emerald-400" },
                  { label: "Total XP",      value: `${totalXP.toLocaleString()}`,              icon: Sparkles,     color: "text-yellow-400" },
                  { label: "Current Rank",  value: "Scholar",                                  icon: Crown,        color: "text-violet-400" },
                  { label: "Day Streak",    value: "5 days",                                   icon: Flame,        color: "text-orange-400" },
                ].map(({ label, value, icon: StatIcon, color }) => (
                  <div key={label} className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm">
                    <StatIcon className={`w-4 h-4 ${color}`} />
                    <div className="text-left">
                      <p className="text-xs text-white/35">{label}</p>
                      <p className="text-sm font-bold text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── 2. Badges Grid ── */}
          <div>
            {/* Category filter */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <h2 className="text-lg font-semibold text-white">Achievement Badges</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 font-medium">
                  {unlockedCount} unlocked
                </span>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
              {categories.map((cat) => (
                <motion.button key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    activeCategory === cat
                      ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                      : "bg-white/4 border-white/8 text-white/40 hover:text-white/70 hover:bg-white/8"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filtered.map((ach) => (
                  <BadgeCard key={ach.id} ach={ach} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── 3. Next Achievement Progress ── */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Target className="w-4 h-4 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">Progress Towards Next</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {nextAchievements.map((next, i) => {
                const Icon = next.icon
                const pct = Math.round((next.current / next.total) * 100)
                return (
                  <motion.div
                    key={next.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-5 flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${next.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm leading-tight truncate">{next.title}</p>
                        <p className="text-xs text-white/35 mt-0.5">{next.description}</p>
                      </div>
                    </div>

                    {next.course && (
                      <p className="text-[10px] text-white/30 -mt-2">Course: {next.course}</p>
                    )}

                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-white/40">
                          {next.current}{next.unit ?? ""} / {next.total}{next.unit ?? ""}
                        </span>
                        <span className="text-white font-semibold">{pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${next.gradient} relative overflow-hidden`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1.4, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
                          />
                        </motion.div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-yellow-400 font-semibold">
                        <Sparkles className="w-3 h-3" /> +{next.xp} XP
                      </span>
                      <span className="text-[10px] text-white/25">{next.total - next.current} {next.unit ? "%" : "to go"}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ── 4 + 5. Timeline + AI Message side by side ── */}
          <div className="grid lg:grid-cols-5 gap-6">

            {/* Timeline */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-4 h-4 text-violet-400" />
                <h2 className="text-lg font-semibold text-white">Achievement Timeline</h2>
              </div>
              <div className="relative">
                {timelineEvents.map((event, i) => (
                  <TimelineItem key={event.title} event={event} index={i} />
                ))}
              </div>
            </div>

            {/* AI Motivational Message */}
            <div className="lg:col-span-2 space-y-4">
              {/* AI Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 to-fuchsia-600/5 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-11 h-11 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center"
                    animate={{ boxShadow: ["0 0 0px rgba(139,92,246,0)", "0 0 20px rgba(139,92,246,0.4)", "0 0 0px rgba(139,92,246,0)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Brain className="w-5 h-5 text-violet-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold text-white">AI Tutor</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-white/35">Online</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      text: `You are making great progress, ${displayName}! You've unlocked ${unlockedCount} out of ${achievements.length} achievements. Keep learning to unlock your next milestone.`,
                      delay: 0.5,
                    },
                    {
                      text: "Your consistency streak is impressive! You're just 2 days away from the Consistency Master badge. Don't break the chain!",
                      delay: 0.8,
                    },
                    {
                      text: "World Geography is at 80% — you're almost there. One last push to earn the Course Finisher badge!",
                      delay: 1.1,
                    },
                  ].map(({ text, delay }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay, duration: 0.4 }}
                      className="rounded-xl bg-black/30 border border-white/6 p-3"
                    >
                      <p className="text-xs text-white/65 leading-relaxed">{text}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={() => setLocation("/chat")}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-violet-900/30"
                >
                  <Zap className="w-4 h-4" /> Chat with AI Tutor
                </motion.button>
              </motion.div>

              {/* Rank card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="rounded-2xl border border-yellow-400/20 bg-gradient-to-br from-yellow-500/8 to-amber-600/5 p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-sm font-bold text-white">Your Rank</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                      <Crown className="w-7 h-7 text-white" />
                    </div>
                    <motion.div className="absolute inset-0 rounded-2xl bg-yellow-400/25 blur-md -z-10"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-yellow-400">Scholar</p>
                    <p className="text-xs text-white/35 mt-0.5">{totalXP.toLocaleString()} XP earned</p>
                    <p className="text-[10px] text-white/25 mt-0.5">Next: Expert — earn 4,550 more XP</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-white/30 mb-1.5">
                    <span>Scholar</span>
                    <span>Expert</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round((totalXP / (totalXP + 4550)) * 100)}%` }}
                      transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

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
