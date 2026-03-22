import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import {
  LayoutDashboard, BookOpen, MessageCircle, TrendingUp,
  Trophy, Settings, LogOut, Search, Bell, ChevronRight,
  Play, Star, Clock, Users, Zap, Brain, Target, Flame,
  Lock, CheckCircle2, Filter, Sparkles, ArrowRight,
  Calculator, Atom, FlaskConical, Globe, Code2, Music,
  BookMarked, ChevronDown,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLocation } from "wouter"
import logoImg from "@assets/Brainimage_(1)_1773355004977.png"
import algebraImg from "@/assets/course-algebra.png"
import biologyImg from "@/assets/course-biology.png"
import physicsImg from "@/assets/course-physics.png"
import chemistryImg from "@/assets/course-chemistry.png"
import geographyImg from "@/assets/course-geography.png"
import pythonImg from "@/assets/course-python.png"
import musicImg from "@/assets/course-music.png"
import calculusImg from "@/assets/course-calculus.png"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "Courses", path: "/courses", active: true },
  { icon: MessageCircle, label: "Chat Learning", path: "/chat" },
  { icon: TrendingUp, label: "Progress", path: "/progress" },
  { icon: Trophy, label: "Achievements", path: "/achievements" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

const categories = [
  { id: "all", label: "All Courses", icon: Sparkles },
  { id: "math", label: "Mathematics", icon: Calculator },
  { id: "science", label: "Science", icon: Atom },
  { id: "chemistry", label: "Chemistry", icon: FlaskConical },
  { id: "geography", label: "Geography", icon: Globe },
  { id: "coding", label: "Coding", icon: Code2 },
  { id: "music", label: "Music", icon: Music },
]

type Difficulty = "Beginner" | "Intermediate" | "Advanced"

interface Course {
  id: number
  title: string
  subject: string
  category: string
  description: string
  progress: number
  lessons: number
  completedLessons: number
  duration: string
  students: number
  rating: number
  difficulty: Difficulty
  gradient: string
  glowColor: string
  icon: typeof Calculator
  image: string
  locked: boolean
  featured?: boolean
  tags: string[]
}

const courses: Course[] = [
  {
    id: 1,
    title: "Advanced Algebra",
    subject: "Algebra",
    category: "math",
    description: "Master equations, functions, and graphing with emotion-aware AI guidance that adapts when you're struggling.",
    progress: 65,
    lessons: 24,
    completedLessons: 16,
    duration: "12h 30m",
    students: 4821,
    rating: 4.9,
    difficulty: "Intermediate",
    gradient: "from-violet-500 via-purple-600 to-indigo-700",
    glowColor: "shadow-violet-500/30",
    icon: Calculator,
    image: algebraImg,
    locked: false,
    featured: true,
    tags: ["Equations", "Functions", "Graphing"],
  },
  {
    id: 2,
    title: "Biology Foundations",
    subject: "Biology",
    category: "science",
    description: "Explore cells, genetics, and ecosystems through interactive lessons that detect confusion and simplify on the fly.",
    progress: 42,
    lessons: 30,
    completedLessons: 13,
    duration: "18h 0m",
    students: 3205,
    rating: 4.7,
    difficulty: "Beginner",
    gradient: "from-cyan-500 via-teal-500 to-emerald-600",
    glowColor: "shadow-cyan-500/30",
    icon: Atom,
    image: biologyImg,
    locked: false,
    tags: ["Cells", "Genetics", "Ecosystems"],
  },
  {
    id: 3,
    title: "Physics Mechanics",
    subject: "Physics",
    category: "science",
    description: "Understand forces, motion, and energy through visualisations and emotional coaching when concepts get tough.",
    progress: 28,
    lessons: 20,
    completedLessons: 6,
    duration: "10h 0m",
    students: 2940,
    rating: 4.8,
    difficulty: "Advanced",
    gradient: "from-pink-500 via-rose-500 to-red-600",
    glowColor: "shadow-pink-500/30",
    icon: Zap,
    image: physicsImg,
    locked: false,
    tags: ["Forces", "Motion", "Energy"],
  },
  {
    id: 4,
    title: "Organic Chemistry",
    subject: "Chemistry",
    category: "chemistry",
    description: "Dive into molecular structures, reactions, and bonds with step-by-step breakdowns tailored to your mood.",
    progress: 0,
    lessons: 28,
    completedLessons: 0,
    duration: "14h 0m",
    students: 1890,
    rating: 4.6,
    difficulty: "Advanced",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    glowColor: "shadow-orange-500/30",
    icon: FlaskConical,
    image: chemistryImg,
    locked: false,
    tags: ["Molecules", "Reactions", "Bonds"],
  },
  {
    id: 5,
    title: "World Geography",
    subject: "Geography",
    category: "geography",
    description: "Travel the globe through immersive maps, cultural insights, and adaptive quizzes that keep you engaged.",
    progress: 80,
    lessons: 18,
    completedLessons: 14,
    duration: "8h 0m",
    students: 2100,
    rating: 4.5,
    difficulty: "Beginner",
    gradient: "from-green-500 via-emerald-500 to-teal-600",
    glowColor: "shadow-green-500/30",
    icon: Globe,
    image: geographyImg,
    locked: false,
    tags: ["Maps", "Cultures", "Regions"],
  },
  {
    id: 6,
    title: "Python Programming",
    subject: "Coding",
    category: "coding",
    description: "Learn Python from scratch with real-world projects, instant AI feedback, and motivation boosts when you code.",
    progress: 0,
    lessons: 36,
    completedLessons: 0,
    duration: "22h 0m",
    students: 6540,
    rating: 4.9,
    difficulty: "Beginner",
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    glowColor: "shadow-blue-500/30",
    icon: Code2,
    image: pythonImg,
    locked: true,
    tags: ["Variables", "Functions", "OOP"],
  },
  {
    id: 7,
    title: "Music Theory",
    subject: "Music",
    category: "music",
    description: "Understand harmony, rhythm, and composition through exercises that adjust complexity based on your emotional state.",
    progress: 0,
    lessons: 22,
    completedLessons: 0,
    duration: "11h 0m",
    students: 1350,
    rating: 4.4,
    difficulty: "Intermediate",
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    glowColor: "shadow-fuchsia-500/30",
    icon: Music,
    image: musicImg,
    locked: true,
    tags: ["Harmony", "Rhythm", "Composition"],
  },
  {
    id: 8,
    title: "Calculus Mastery",
    subject: "Mathematics",
    category: "math",
    description: "Conquer derivatives, integrals, and limits with visualisations and emotion-adaptive explanations.",
    progress: 0,
    lessons: 32,
    completedLessons: 0,
    duration: "20h 0m",
    students: 3870,
    rating: 4.8,
    difficulty: "Advanced",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-600",
    glowColor: "shadow-purple-500/30",
    icon: Brain,
    image: calculusImg,
    locked: true,
    tags: ["Derivatives", "Integrals", "Limits"],
  },
]

const difficultyConfig: Record<Difficulty, { color: string; bg: string }> = {
  Beginner:     { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  Intermediate: { color: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/20" },
  Advanced:     { color: "text-rose-400",    bg: "bg-rose-400/10 border-rose-400/20" },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const cardItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function FloatingOrb({ className }: { className: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const [hovered, setHovered] = useState(false)
  const diff = difficultyConfig[course.difficulty]
  const Icon = course.icon

  return (
    <motion.div
      variants={cardItem}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`relative rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm overflow-hidden flex flex-col group cursor-pointer ${hovered ? `shadow-xl ${course.glowColor}` : "shadow-none"} transition-shadow duration-300`}
    >
      {/* Image top banner */}
      <div className={`relative h-36 bg-gradient-to-br ${course.gradient} overflow-hidden`}>
        <img
          src={course.image}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-60`} />
        <div className="absolute inset-0 bg-black/30" />
        {/* Animated shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={hovered ? { x: ["-100%", "200%"] } : { x: "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        {/* Icon */}
        <div className="absolute bottom-4 left-4">
          <div className="w-12 h-12 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {course.locked && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-xs text-white/70">
              <Lock className="w-3 h-3" /> Premium
            </div>
          )}
          {course.featured && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-500/70 backdrop-blur-sm border border-violet-400/40 text-xs text-white font-medium">
              <Sparkles className="w-3 h-3" /> Featured
            </div>
          )}
        </div>
        {/* Progress ring hint */}
        {course.progress > 0 && (
          <div className="absolute bottom-4 right-4">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                <motion.circle
                  cx="18" cy="18" r="15" fill="none"
                  stroke="white" strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 15}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 15 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 15 * (1 - course.progress / 100) }}
                  transition={{ duration: 1.4, delay: 0.2 + index * 0.06, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">{course.progress}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title + difficulty */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base leading-tight truncate">{course.title}</h3>
            <p className="text-xs text-white/40 mt-0.5">{course.subject}</p>
          </div>
          <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full border font-medium ${diff.bg} ${diff.color}`}>
            {course.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{course.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {course.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-white/40">{tag}</span>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-white/35 pt-1 border-t border-white/5">
          <span className="flex items-center gap-1"><BookMarked className="w-3 h-3" />{course.lessons} lessons</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
          <span className="flex items-center gap-1 ml-auto">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white/50">{course.rating}</span>
          </span>
        </div>

        {/* Progress bar */}
        {course.progress > 0 && (
          <div>
            <div className="flex justify-between text-[10px] text-white/30 mb-1.5">
              <span>{course.completedLessons}/{course.lessons} lessons</span>
              <span>{course.progress}% done</span>
            </div>
            <div className="h-1 rounded-full bg-white/8 overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${course.gradient}`}
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1.2, delay: 0.3 + index * 0.05, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            course.locked
              ? "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
              : course.progress > 0
              ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/30"
              : "bg-white/8 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white"
          }`}
          disabled={course.locked}
        >
          {course.locked ? (
            <><Lock className="w-3.5 h-3.5" /> Unlock Course</>
          ) : course.progress > 0 ? (
            <><Play className="w-3.5 h-3.5 fill-white" /> Continue Learning</>
          ) : (
            <><Play className="w-3.5 h-3.5" /> Start Course</>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Courses() {
  const { user, signOut } = useAuth()
  const [, setLocation] = useLocation()
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"popular" | "progress" | "newest">("popular")
  const [showSort, setShowSort] = useState(false)

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Learner"
  const initials = displayName.slice(0, 2).toUpperCase()

  const handleLogout = () => { signOut(); setLocation("/") }

  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "all" || c.category === activeCategory
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.subject.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  }).sort((a, b) => {
    if (sortBy === "progress") return b.progress - a.progress
    if (sortBy === "newest") return b.id - a.id
    return b.students - a.students
  })

  const featuredCourse = courses.find((c) => c.featured)!

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
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-rose-400 hover:bg-rose-400/5 transition-all group">
            <LogOut className="w-4 h-4" /> Logout
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
              placeholder="Search courses…"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 transition-all"
            />
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

          {/* ── Featured Hero Banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-white/10 p-8"
            style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.45) 0%, rgba(6,182,212,0.2) 55%, rgba(0,0,0,0.6) 100%)" }}
          >
            {/* Hero background image */}
            <img
              src={featuredCourse.image}
              alt={featuredCourse.title}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            {/* Orbs */}
            <FloatingOrb className="w-64 h-64 -top-24 -right-16 bg-violet-500/15" />
            <FloatingOrb className="w-48 h-48 -bottom-16 right-48 bg-cyan-500/10" />
            <div className="absolute inset-0 pointer-events-none">
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-xs text-violet-300 font-medium">
                    <Sparkles className="w-3 h-3" /> Featured Course
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-xs text-amber-300 font-medium">
                    <Flame className="w-3 h-3" /> Most Popular
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-tight">
                  {featuredCourse.title}
                </h1>
                <p className="text-white/55 text-sm leading-relaxed max-w-xl mb-5">
                  {featuredCourse.description}
                </p>
                <div className="flex flex-wrap items-center gap-5 text-sm text-white/50 mb-6">
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-white font-semibold">{featuredCourse.rating}</span> rating</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{featuredCourse.students.toLocaleString()} students</span>
                  <span className="flex items-center gap-1.5"><BookMarked className="w-4 h-4" />{featuredCourse.lessons} lessons</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featuredCourse.duration}</span>
                </div>
                {/* Hero progress */}
                <div className="mb-6 max-w-sm">
                  <div className="flex justify-between text-xs text-white/40 mb-2">
                    <span>Your progress</span>
                    <span>{featuredCourse.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${featuredCourse.gradient}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${featuredCourse.progress}%` }}
                      transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setLocation("/chat")}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition-colors shadow-xl shadow-violet-900/40"
                  >
                    <Play className="w-4 h-4 fill-white" /> Continue Learning
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-bold transition-colors"
                  >
                    View Syllabus <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Right: mini lesson list */}
              <div className="lg:w-72 shrink-0">
                <div className="rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4 text-violet-400" /> Up Next
                  </h3>
                  {[
                    { title: "Quadratic Equations", done: true },
                    { title: "Solving Inequalities", done: true },
                    { title: "Polynomial Functions", done: false, active: true },
                    { title: "Exponential Functions", done: false },
                    { title: "Logarithms", done: false },
                  ].map((lesson, i) => (
                    <motion.div
                      key={lesson.title}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                        lesson.active
                          ? "bg-violet-500/15 border border-violet-500/25"
                          : lesson.done
                          ? "bg-white/3"
                          : "bg-transparent"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        lesson.done ? "bg-emerald-500/20 text-emerald-400" : lesson.active ? "bg-violet-500/30 text-violet-300" : "bg-white/8 text-white/30"
                      }`}>
                        {lesson.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                      </div>
                      <span className={`text-xs flex-1 ${lesson.active ? "text-white font-medium" : lesson.done ? "text-white/40 line-through" : "text-white/50"}`}>
                        {lesson.title}
                      </span>
                      {lesson.active && <Play className="w-3 h-3 text-violet-400 fill-violet-400" />}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Quick Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { label: "Enrolled Courses", value: "5", icon: BookOpen, color: "text-violet-400", bg: "from-violet-500/15 to-purple-500/5" },
              { label: "Hours Learned",    value: "32h",icon: Clock,    color: "text-cyan-400",   bg: "from-cyan-500/15 to-blue-500/5" },
              { label: "Lessons Done",     value: "49", icon: CheckCircle2, color: "text-emerald-400", bg: "from-emerald-500/15 to-green-500/5" },
              { label: "Avg. Rating",      value: "4.8", icon: Star,    color: "text-yellow-400", bg: "from-yellow-500/15 to-amber-500/5" },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <motion.div key={label} whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`rounded-2xl border border-white/8 bg-gradient-to-br ${bg} p-5 flex items-center gap-4`}
              >
                <div className={`w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Category Filter + Sort ── */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-1 flex-1 scrollbar-hide">
              {categories.map(({ id, label, icon: CatIcon }) => (
                <motion.button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    activeCategory === id
                      ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                      : "bg-white/4 border-white/8 text-white/45 hover:text-white/70 hover:bg-white/8"
                  }`}
                >
                  <CatIcon className="w-3.5 h-3.5" />
                  {label}
                </motion.button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50 hover:text-white/80 hover:bg-white/8 transition-all"
              >
                <Filter className="w-3.5 h-3.5" />
                Sort: {sortBy === "popular" ? "Most Popular" : sortBy === "progress" ? "In Progress" : "Newest"}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSort ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/10 bg-[#0e0e18] shadow-2xl z-50 overflow-hidden"
                  >
                    {[
                      { key: "popular", label: "Most Popular" },
                      { key: "progress", label: "In Progress" },
                      { key: "newest", label: "Newest" },
                    ].map(({ key, label }) => (
                      <button key={key}
                        onClick={() => { setSortBy(key as typeof sortBy); setShowSort(false) }}
                        className={`w-full px-4 py-2.5 text-left text-xs transition-colors ${
                          sortBy === key ? "bg-violet-500/15 text-violet-300" : "text-white/50 hover:bg-white/5 hover:text-white/80"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Course Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery + sortBy}
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {filtered.length === 0 ? (
                <motion.div variants={cardItem} className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-7 h-7 text-white/20" />
                  </div>
                  <p className="text-white/30 text-sm">No courses found</p>
                  <p className="text-white/20 text-xs mt-1">Try a different search or category</p>
                </motion.div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((course, i) => (
                    <CourseCard key={course.id} course={course} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom CTA banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-cyan-500/20 p-7 flex flex-col sm:flex-row sm:items-center gap-6"
            style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(109,40,217,0.15) 100%)" }}
          >
            <FloatingOrb className="w-40 h-40 -top-10 -right-10 bg-cyan-500/10" />
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white">Not sure where to start?</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Chat with your AI tutor and it will detect your learning style and recommend the perfect course for you.
              </p>
            </div>
            <motion.button
              onClick={() => setLocation("/chat")}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="relative z-10 shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold transition-colors shadow-lg shadow-cyan-900/30"
            >
              <Zap className="w-4 h-4" /> Ask AI Tutor
            </motion.button>
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
