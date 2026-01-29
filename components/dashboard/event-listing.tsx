"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { generateCalendarLink } from "@/lib/calendar-service"

const mockEvents = [
  {
    id: "1",
    title: "ELVION Hackathon",
    category: "tech",
    date: "2026-02-11",
    time: "09:00",
    location: "RMDSTIC, Warje",
    description: "Learn about the latest trends in AI and ML",
    attendees: 45,
    capacity: 100,
    image: "/hackathon.png",
    rsvped: false,
    posterPrompt: "modern, futuristic design with circuit patterns",
  },
  {
    id: "2",
    title: "Sinhgad Olumpus 2026",
    category: "sports",
    date: "2026-02-25",
    time: "09:00",
    location: "Sinhagad college Ground, Vadgaon",
    description: "College-wide sports competition and activities",
    attendees: 120,
    capacity: 200,
    image: "/sports.png",
    rsvped: false,
    posterPrompt: "energetic, dynamic composition with athletes",
  },
  {
    id: "3",
    title: "Sinhgad spring fest 2026",
    category: "cultural",
    date: "2024-03-10",
    time: "18:00",
    location: "SCOE Cultural hall",
    description: "Celebrate diverse cultures with music, dance, and food",
    attendees: 200,
    capacity: 300,
    image: "/fest.png",
    rsvped: false,
    posterPrompt: "colorful, diverse, celebration theme",
  },
]

const categoryColors: Record<string, string> = {
  tech: "bg-primary/20 text-primary",
  sports: "bg-accent/20 text-accent",
  cultural: "bg-secondary/20 text-secondary",
}

interface EventListingProps {
  role: string
}

export function EventListing({ role }: EventListingProps) {
  const [events, setEvents] = useState(mockEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<(typeof mockEvents)[0] | null>(null)

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleRsvp = (eventId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? { ...event, rsvped: !event.rsvped, attendees: event.rsvped ? event.attendees - 1 : event.attendees + 1 }
          : event,
      ),
    )
  }

  const handleAddToCalendar = async (event: (typeof mockEvents)[0]) => {
    const startDateTime = new Date(`${event.date}T${event.time}:00`)
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000) // 2 hours duration

    const calendarEvent = {
      id: event.id,
      title: event.title,
      description: event.description,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      location: event.location,
    }

    const calendarLink = await generateCalendarLink(calendarEvent)
    window.open(calendarLink, "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Discover Events</CardTitle>
          <CardDescription>Find and join upcoming campus events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <div className="flex flex-wrap gap-2">
            {["all", "tech", "sports", "cultural"].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedEvent && (
        <Card className="border-primary bg-card/50">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-foreground text-xl font-bold">{selectedEvent.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{selectedEvent.posterPrompt}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedEvent(null)}>
                ✕
              </Button>
            </div>
            <p className="text-foreground mb-4">{selectedEvent.description}</p>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="text-sm">
                <p className="text-muted-foreground">📅 Date & Time</p>
                <p className="text-foreground font-medium">
                  {selectedEvent.date} at {selectedEvent.time}
                </p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">📍 Location</p>
                <p className="text-foreground font-medium">{selectedEvent.location}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                variant={selectedEvent.rsvped ? "outline" : "default"}
                onClick={() => {
                  handleRsvp(selectedEvent.id)
                  setSelectedEvent({
                    ...selectedEvent,
                    rsvped: !selectedEvent.rsvped,
                  })
                }}
              >
                {selectedEvent.rsvped ? "Cancel RSVP" : "RSVP Now"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => handleAddToCalendar(selectedEvent)}
              >
                Add to Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
            onClick={() => setSelectedEvent(event)}
          >
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-48 w-full object-cover" />
            <CardContent className="pt-4">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-foreground line-clamp-2 flex-1 text-lg font-semibold">{event.title}</h3>
                <Badge className={categoryColors[event.category]}>{event.category}</Badge>
              </div>

              <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{event.description}</p>

              <div className="text-muted-foreground mb-4 space-y-2 text-sm">
                <p>
                  📅 {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
                <p>📍 {event.location}</p>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {event.attendees}/{event.capacity} attending
                </span>
                <div className="bg-border h-2 w-24 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                  />
                </div>
              </div>

              <Button
                className="w-full"
                variant={event.rsvped ? "outline" : "default"}
                onClick={(e) => {
                  e.stopPropagation()
                  handleRsvp(event.id)
                }}
              >
                {event.rsvped ? "Cancel RSVP" : "RSVP Now"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="pt-8 text-center">
            <p className="text-muted-foreground mb-4">No events found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
