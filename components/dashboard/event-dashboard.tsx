"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAIGeneration } from "@/hooks/use-ai-generation"

const mockOrganizerEvents = [
  {
    id: "1",
    title: "SIH 2026 Hackathon",
    category: "tech",
    date: "2024-02-15",
    time: "14:00",
    location: "Tech Building, Room 101",
    attendees: 45,
    capacity: 100,
    status: "published",
  },
]

interface EventDashboardProps {
  role: string
}

export function EventDashboard({ role }: EventDashboardProps) {
  const [events, setEvents] = useState(mockOrganizerEvents)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "tech",
    date: "",
    time: "",
    location: "",
    capacity: "100",
    description: "",
  })
  const { generateDescription, isLoading } = useAIGeneration()

  const handleGenerateDescription = async () => {
    if (formData.title) {
      const generatedDesc = await generateDescription(formData.title, formData.category)
      setFormData({ ...formData, description: generatedDesc })
    }
  }

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.date) {
      const newEvent = {
        id: Date.now().toString(),
        ...formData,
        attendees: 0,
        capacity: Number.parseInt(formData.capacity),
        status: "published",
      }
      setEvents([...events, newEvent as any])
      setFormData({
        title: "",
        category: "tech",
        date: "",
        time: "",
        location: "",
        capacity: "100",
        description: "",
      })
      setShowCreateForm(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Create Event Section */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Events</CardTitle>
          <CardDescription>Create and manage your campus events</CardDescription>
        </CardHeader>
        <CardContent>
          {!showCreateForm ? (
            <Button onClick={() => setShowCreateForm(true)} className="w-full">
              Create New Event
            </Button>
          ) : (
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">Event Title</label>
                <Input
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="border-input bg-background text-foreground w-full rounded-md border px-3 py-2"
                  >
                    <option value="tech">Tech</option>
                    <option value="sports">Sports</option>
                    <option value="cultural">Cultural</option>
                  </select>
                </div>
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">Capacity</label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">Location</label>
                <Input
                  placeholder="Event location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-foreground text-sm font-medium">Description</label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleGenerateDescription}
                    disabled={isLoading || !formData.title}
                    className="text-xs"
                  >
                    {isLoading ? "Generating..." : "✨ AI Generate"}
                  </Button>
                </div>
                <textarea
                  placeholder="Event description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border-input bg-background text-foreground min-h-24 w-full rounded-md border px-3 py-2"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Create Event
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    {event.date} at {event.time} • {event.location}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    View Analytics
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    {event.attendees}/{event.capacity} people registered
                  </p>
                </div>
                <div className="text-primary text-sm font-medium">
                  {Math.round((event.attendees / event.capacity) * 100)}% full
                </div>
              </div>
              <div className="bg-border mt-2 h-2 w-full overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full transition-all"
                  style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
