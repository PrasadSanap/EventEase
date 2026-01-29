"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventListing } from "./event-listing"
import { EventDashboard } from "./event-dashboard"
import { VolunteerSystem } from "./volunteer-system"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "organizer" | "admin"
  avatar?: string
}

interface DashboardPageProps {
  user: User
  onLogout: () => void
}

export function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState("discover")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
              E
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EventEase</h1>
              <p className="text-xs text-muted-foreground">Campus Event Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
              <div className="text-sm">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discover">Discover Events</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            {(user.role === "organizer" || user.role === "admin") && (
              <TabsTrigger value="manage">Manage Events</TabsTrigger>
            )}
            {(user.role === "organizer" || user.role === "admin") && (
              <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="discover" className="mt-6">
            <EventListing role={user.role} />
          </TabsContent>

          <TabsContent value="my-events" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Registered Events</CardTitle>
                <CardDescription>Events you've RSVP'd to</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No registered events yet</p>
                  <Button className="mt-4" onClick={() => setActiveTab("discover")}>
                    Explore Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {(user.role === "organizer" || user.role === "admin") && (
            <>
              <TabsContent value="manage" className="mt-6">
                <EventDashboard role={user.role} />
              </TabsContent>

              <TabsContent value="volunteers" className="mt-6">
                <VolunteerSystem role={user.role} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">EventEase</h4>
              <p className="text-sm text-muted-foreground">Smart campus event management platform</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Event Discovery</li>
                <li>RSVP Management</li>
                <li>Volunteer Coordination</li>
                <li>AI Content Generation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 EventEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
