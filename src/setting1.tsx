import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BirdIcon as Cricket, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  // Placeholder data for live matches
  const liveMatches = [
    {
      id: 1,
      teams: "India vs Australia",
      format: "T20",
      venue: "Melbourne Cricket Ground",
      score: "IND: 186/4 (20) | AUS: 142/8 (20)",
      status: "India won by 44 runs",
      isLive: false,
    },
    {
      id: 2,
      teams: "England vs South Africa",
      format: "ODI",
      venue: "Lord's, London",
      score: "ENG: 235/6 (42.3) | SA: 234/9 (50)",
      status: "England won by 4 wickets",
      isLive: false,
    },
    {
      id: 3,
      teams: "Pakistan vs New Zealand",
      format: "Test",
      venue: "National Stadium, Karachi",
      score: "PAK: 304/5 (88) | NZ: Yet to bat",
      status: "Day 1: Stumps",
      isLive: true,
    },
  ]

  // Placeholder data for upcoming matches
  const upcomingMatches = [
    {
      id: 4,
      teams: "West Indies vs Sri Lanka",
      format: "T20",
      venue: "Kensington Oval, Barbados",
      date: "Tomorrow, 7:00 PM",
    },
    {
      id: 5,
      teams: "Bangladesh vs Zimbabwe",
      format: "ODI",
      venue: "Shere Bangla Stadium, Dhaka",
      date: "Mar 15, 2:30 PM",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here are the latest cricket updates.</p>
        </div>
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList>
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Cricket className="h-4 w-4" />
            <span>Live & Recent</span>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Upcoming</span>
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Teams</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          {liveMatches.map((match) => (
            <Card key={match.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{match.teams}</CardTitle>
                  <CardDescription>
                    {match.format} • {match.venue}
                  </CardDescription>
                </div>
                {match.isLive && (
                  <Badge variant="destructive" className="animate-pulse">
                    LIVE
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="font-medium">{match.score}</p>
                <p className="text-sm text-muted-foreground mt-1">{match.status}</p>
                <Button asChild variant="link" className="p-0 h-auto mt-2">
                  <Link href={`/dashboard/matches/${match.id}`}>View details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingMatches.map((match) => (
            <Card key={match.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">{match.teams}</CardTitle>
                <CardDescription>
                  {match.format} • {match.venue}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="font-medium">{match.date}</p>
                <Button asChild variant="link" className="p-0 h-auto mt-2">
                  <Link href={`/dashboard/matches/${match.id}`}>Set reminder</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="teams" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["India", "Australia", "England", "South Africa", "New Zealand", "Pakistan"].map((team) => (
            <Card key={team} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">{team}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link href={`/dashboard/teams/${team.toLowerCase()}`}>View team</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

