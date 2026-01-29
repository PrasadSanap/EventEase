"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockVolunteerRoles = [
  {
    id: "1",
    eventId: "1",
    eventTitle: "AI & Machine Learning Workshop",
    role: "Registration Desk",
    shifts: ["10:00-12:00", "12:00-14:00"],
    volunteers: 3,
    needed: 5,
  },
  {
    id: "2",
    eventId: "1",
    eventTitle: "AI & Machine Learning Workshop",
    role: "Event Host",
    shifts: ["14:00-17:00"],
    volunteers: 1,
    needed: 2,
  },
]

interface VolunteerSystemProps {
  role: string
}

export function VolunteerSystem({ role }: VolunteerSystemProps) {
  const [volunteerRoles, setVolunteerRoles] = useState(mockVolunteerRoles)
  const [showAddRole, setShowAddRole] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Volunteer Coordination</CardTitle>
          <CardDescription>Manage volunteer roles and assignments for your events</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowAddRole(!showAddRole)} className="w-full">
            Add Volunteer Role
          </Button>
        </CardContent>
      </Card>

      {/* Volunteer Roles */}
      <div className="space-y-4">
        {volunteerRoles.map((volRole) => (
          <Card key={volRole.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{volRole.role}</CardTitle>
                  <CardDescription>{volRole.eventTitle}</CardDescription>
                </div>
                <Badge variant={volRole.volunteers >= volRole.needed ? "default" : "outline"}>
                  {volRole.volunteers}/{volRole.needed} volunteers
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Available Shifts:</p>
                <div className="flex flex-wrap gap-2">
                  {volRole.shifts.map((shift, idx) => (
                    <Badge key={idx} variant="secondary">
                      {shift}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View Volunteers
                </Button>
                <Button size="sm" className="flex-1">
                  Send Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
