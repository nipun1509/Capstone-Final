import { Switch, Route, Router as WouterRouter } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import NotFound from "@/pages/not-found"
import Home from "@/pages/home"
import Dashboard from "@/pages/dashboard"
import ChatLearning from "@/pages/chat-learning"
import Courses from "@/pages/courses"
import Progress from "@/pages/progress"
import Achievements from "@/pages/achievements"
import SettingsPage from "@/pages/settings"
import { AuthProvider } from "@/context/auth-context"

const queryClient = new QueryClient()

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/courses" component={Courses} />
      <Route path="/progress" component={Progress} />
      <Route path="/achievements" component={Achievements} />
      <Route path="/chat" component={ChatLearning} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
