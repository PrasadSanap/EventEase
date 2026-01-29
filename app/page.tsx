"use client"

import { useState } from "react"
import { AuthPage } from "@/components/auth/auth-page"
import { DashboardPage } from "@/components/dashboard/dashboard-page"

type UserRole = "student" | "organizer" | "admin"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = (email: string, password: string, role: UserRole) => {
    // Mock login - in real app with Firebase
    setUser({
      id: "1",
      name: email.split("@")[0],
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    })
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return <AuthPage onLogin={handleLogin} />
  }

  return <DashboardPage user={user} onLogout={handleLogout} />
}
