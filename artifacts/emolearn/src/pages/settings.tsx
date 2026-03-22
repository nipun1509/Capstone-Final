import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import {
  LayoutDashboard, BookOpen, MessageCircle, TrendingUp,
  Trophy, Settings, LogOut, ChevronRight, User, Brain,
  Bell, Shield, Palette, Trash2, Camera, Save,
  Lock, Smartphone, Sun, Moon, Monitor, AlertTriangle,
  GraduationCap, Target, Zap, Heart, Eye,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLocation } from "wouter"
import logoImg from "@assets/Brainimage_(1)_1773355004977.png"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: MessageCircle, label: "Chat Learning", path: "/chat" },
  { icon: TrendingUp, label: "Progress", path: "/progress" },
  { icon: Trophy, label: "Achievements", path: "/achievements" },
  { icon: Settings, label: "Settings", path: "/settings", active: true },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${
        enabled ? "bg-violet-500" : "bg-white/10"
      }`}
    >
      <motion.span
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm block"
      />
    </button>
  )
}

function SectionCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  description,
  children,
}: {
  icon: React.ElementType
  iconColor: string
  iconBg: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm overflow-hidden"
    >
      <div className="flex items-center gap-4 px-6 py-5 border-b border-white/5">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <p className="text-xs text-white/40 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </motion.div>
  )
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
      <div className="min-w-0">
        <p className="text-sm text-white/80 font-medium">{label}</p>
        {description && <p className="text-xs text-white/35 mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const [, setLocation] = useLocation()

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Learner"
  const initials = displayName.slice(0, 2).toUpperCase()

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: (user?.name || "learner").toLowerCase().replace(/\s+/g, "_"),
  })
  const [profileSaved, setProfileSaved] = useState(false)

  const [subject, setSubject] = useState("Mathematics")
  const [difficulty, setDifficulty] = useState("Intermediate")
  const [dailyGoal, setDailyGoal] = useState(30)

  const [explanationStyle, setExplanationStyle] = useState("Step-by-step")
  const [motivational, setMotivational] = useState(true)
  const [emotionAware, setEmotionAware] = useState(true)

  const [notifs, setNotifs] = useState({
    studyReminders: true,
    achievements: true,
    weeklyReport: false,
  })

  const [twoFA, setTwoFA] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" })

  const [theme, setTheme] = useState<"dark" | "light" | "auto">("dark")

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState("")

  const handleSaveProfile = () => {
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  const handleLogout = () => {
    signOut()
    setLocation("/")
  }

  const subjects = ["Mathematics", "Physics", "Biology", "Chemistry", "Computer Science", "History", "Literature", "Geography"]
  const difficulties = ["Beginner", "Intermediate", "Advanced"]
  const explanationStyles = ["Simple", "Detailed", "Step-by-step"]
  const themes = [
    { value: "dark", label: "Dark", icon: Moon },
    { value: "light", label: "Light", icon: Sun },
    { value: "auto", label: "Auto", icon: Monitor },
  ] as const

  return (
    <div className="min-h-screen bg-[#050508] text-white flex">

      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 z-40 flex flex-col border-r border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
          <img src={logoImg} alt="EmoLearn" className="w-9 h-9" />
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">EmoLearn</span>
        </div>
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

        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl">
          <div>
            <h1 className="text-lg font-bold text-white">Settings</h1>
            <p className="text-xs text-white/35">Manage your profile, preferences, and account</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
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
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-5">

            {/* ── 1. Profile Settings ── */}
            <SectionCard
              icon={User}
              iconColor="text-violet-400"
              iconBg="bg-violet-500/15"
              title="Profile Settings"
              description="Update your personal information and avatar"
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="relative group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xl font-bold text-white shrink-0">
                    {initials}
                  </div>
                  <button className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{displayName}</p>
                  <p className="text-xs text-white/40 mt-0.5">{user?.email || "No email set"}</p>
                  <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors mt-1.5">
                    Change avatar
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-white/40 font-medium mb-1.5">Full Name</label>
                  <input
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 font-medium mb-1.5">Email Address</label>
                  <input
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 font-medium mb-1.5">Username</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30">@</span>
                    <input
                      value={profileForm.username}
                      onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <motion.button
                  onClick={handleSaveProfile}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-violet-900/30"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
                <AnimatePresence>
                  {profileSaved && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-emerald-400 font-medium"
                    >
                      ✓ Saved successfully
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </SectionCard>

            {/* ── 2. Learning Preferences ── */}
            <SectionCard
              icon={GraduationCap}
              iconColor="text-cyan-400"
              iconBg="bg-cyan-500/15"
              title="Learning Preferences"
              description="Customize your learning experience"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-xs text-white/40 font-medium mb-2">Preferred Subject Focus</label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSubject(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          subject === s
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                            : "bg-white/5 text-white/40 border border-white/8 hover:bg-white/10 hover:text-white/70"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/40 font-medium mb-2">Difficulty Level</label>
                  <div className="flex gap-3">
                    {difficulties.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                          difficulty === d
                            ? "bg-violet-500/20 text-violet-300 border-violet-500/40"
                            : "bg-white/5 text-white/40 border-white/8 hover:bg-white/10 hover:text-white/70"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-white/40 font-medium">Daily Study Goal</label>
                    <span className="text-sm font-semibold text-white">{dailyGoal} min/day</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={5}
                      max={120}
                      step={5}
                      value={dailyGoal}
                      onChange={(e) => setDailyGoal(Number(e.target.value))}
                      className="w-full h-2 appearance-none rounded-full bg-white/10 accent-violet-500 cursor-pointer"
                    />
                    <div className="flex justify-between mt-1.5">
                      <span className="text-xs text-white/25">5 min</span>
                      <span className="text-xs text-white/25">2 hrs</span>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* ── 3. AI Tutor Preferences ── */}
            <SectionCard
              icon={Brain}
              iconColor="text-purple-400"
              iconBg="bg-purple-500/15"
              title="AI Tutor Preferences"
              description="Configure how your AI tutor behaves"
            >
              <div className="mb-5">
                <label className="block text-xs text-white/40 font-medium mb-2">Explanation Style</label>
                <div className="flex gap-3">
                  {explanationStyles.map((s) => (
                    <button
                      key={s}
                      onClick={() => setExplanationStyle(s)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        explanationStyle === s
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                          : "bg-white/5 text-white/40 border-white/8 hover:bg-white/10 hover:text-white/70"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <SettingRow
                label="Motivational Messages"
                description="Receive encouraging messages to keep you going"
              >
                <Toggle enabled={motivational} onToggle={() => setMotivational(!motivational)} />
              </SettingRow>
              <SettingRow
                label="Emotion-Aware Tutoring"
                description="Let the AI adapt its tone based on how you feel"
              >
                <Toggle enabled={emotionAware} onToggle={() => setEmotionAware(!emotionAware)} />
              </SettingRow>
            </SectionCard>

            {/* ── 4. Notification Settings ── */}
            <SectionCard
              icon={Bell}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/15"
              title="Notification Settings"
              description="Control what notifications you receive"
            >
              <SettingRow
                label="Study Reminders"
                description="Get daily reminders to keep your streak alive"
              >
                <Toggle
                  enabled={notifs.studyReminders}
                  onToggle={() => setNotifs({ ...notifs, studyReminders: !notifs.studyReminders })}
                />
              </SettingRow>
              <SettingRow
                label="Achievement Notifications"
                description="Be notified when you unlock new badges and rewards"
              >
                <Toggle
                  enabled={notifs.achievements}
                  onToggle={() => setNotifs({ ...notifs, achievements: !notifs.achievements })}
                />
              </SettingRow>
              <SettingRow
                label="Weekly Progress Reports"
                description="Receive a weekly summary of your learning journey"
              >
                <Toggle
                  enabled={notifs.weeklyReport}
                  onToggle={() => setNotifs({ ...notifs, weeklyReport: !notifs.weeklyReport })}
                />
              </SettingRow>
            </SectionCard>

            {/* ── 5. Security Settings ── */}
            <SectionCard
              icon={Shield}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/15"
              title="Security Settings"
              description="Keep your account safe and secure"
            >
              <SettingRow
                label="Two-Factor Authentication"
                description="Add an extra layer of protection to your account"
              >
                <Toggle enabled={twoFA} onToggle={() => setTwoFA(!twoFA)} />
              </SettingRow>

              <div className="mt-2">
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors py-2"
                >
                  <Lock className="w-4 h-4" />
                  {showPasswordForm ? "Cancel" : "Change Password"}
                </button>

                <AnimatePresence>
                  {showPasswordForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 pt-3 border-t border-white/5 mt-2">
                        {[
                          { key: "current", label: "Current Password" },
                          { key: "newPass", label: "New Password" },
                          { key: "confirm", label: "Confirm New Password" },
                        ].map(({ key, label }) => (
                          <div key={key}>
                            <label className="block text-xs text-white/40 font-medium mb-1.5">{label}</label>
                            <input
                              type="password"
                              value={passwords[key as keyof typeof passwords]}
                              onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 transition-all"
                              placeholder="••••••••"
                            />
                          </div>
                        ))}
                        <button className="mt-1 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors">
                          Update Password
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {twoFA && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-4 flex items-start gap-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20 p-4"
                  >
                    <Smartphone className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-emerald-300">Two-Factor Authentication Enabled</p>
                      <p className="text-xs text-white/40 mt-0.5">Your account is protected with an extra layer of security.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </SectionCard>

            {/* ── 6. Theme Settings ── */}
            <SectionCard
              icon={Palette}
              iconColor="text-pink-400"
              iconBg="bg-pink-500/15"
              title="Theme Settings"
              description="Choose how EmoLearn looks to you"
            >
              <div className="flex gap-3">
                {themes.map(({ value, label, icon: ThemeIcon }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`flex-1 flex flex-col items-center gap-2.5 py-4 rounded-xl border transition-all ${
                      theme === value
                        ? "bg-pink-500/15 border-pink-500/40 text-pink-300"
                        : "bg-white/5 border-white/8 text-white/40 hover:bg-white/8 hover:text-white/70"
                    }`}
                  >
                    <ThemeIcon className="w-5 h-5" />
                    <span className="text-xs font-medium">{label}</span>
                    {theme === value && (
                      <motion.span
                        layoutId="theme-indicator"
                        className="w-1.5 h-1.5 rounded-full bg-pink-400"
                      />
                    )}
                  </button>
                ))}
              </div>
            </SectionCard>

            {/* ── 7. Account Actions ── */}
            <motion.div variants={item}>
              <div className="rounded-2xl border border-rose-500/15 bg-rose-500/5 backdrop-blur-sm overflow-hidden">
                <div className="flex items-center gap-4 px-6 py-5 border-b border-rose-500/10">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">Account Actions</h2>
                    <p className="text-xs text-white/40 mt-0.5">Manage your account status</p>
                  </div>
                </div>
                <div className="px-6 py-5 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 text-sm font-semibold transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </button>
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

      {/* ── Delete Account Modal ── */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-md rounded-2xl border border-rose-500/20 bg-[#0d0d14] p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Delete Account</h3>
                  <p className="text-xs text-white/40">This action cannot be undone</p>
                </div>
              </div>

              <p className="text-sm text-white/60 leading-relaxed mb-5">
                Deleting your account will permanently remove all your learning data, progress, achievements, and personal information. This cannot be reversed.
              </p>

              <div className="mb-5">
                <label className="block text-xs text-white/40 font-medium mb-1.5">
                  Type <span className="text-rose-400 font-semibold">DELETE</span> to confirm
                </label>
                <input
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-rose-500/50 transition-all"
                  placeholder="DELETE"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowDeleteModal(false); setDeleteConfirm("") }}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  disabled={deleteConfirm !== "DELETE"}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all"
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
