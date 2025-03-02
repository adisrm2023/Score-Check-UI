import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export default function MatchesPage() {
  // Placeholder data for all matches
  const allMatches = [
    {
      id: 1,
      teams: "India vs Australia",
      format: "T20",
      venue: "Melbourne Cricket Ground",
      score: "IND: 186/4 (20) | AUS: 142/8 (20)",
      status: "India won by 44 runs",
      isLive: false,
      date: "Today",
    },
    {
      id: 2,
      teams: "England vs South Africa",
      format: "ODI",
      venue: "Lord's, London",
      score: "ENG: 235/6 (42.3) | SA: 234/9 (50)",
      status: "England won by 4 wickets",
      isLive: false,
      date: "Yesterday",
    },
    {
      id: 3,
      teams: "Pakistan vs New Zealand",
      format: "Test",
      venue: "National Stadium, Karachi",
      score: "PAK: 304/5 (88) | NZ: Yet to bat",
      status: "Day 1: Stumps",
      isLive: true,
      date: "Today",
    },
    {
      id: 4,
      teams: "West Indies vs Sri Lanka",
      format: "T20",
      venue: "Kensington Oval, Barbados",
      date: "Tomorrow, 7:00 PM",
      isUpcoming: true,
    },
    {
      id: 5,
      teams: "Bangladesh vs Zimbabwe",
      format: "ODI",
      venue: "Shere Bangla Stadium, Dhaka",
      date: "Mar 15, 2:30 PM",
      isUpcoming: true,
    },
    {
      id: 6,
      teams: "Afghanistan vs Ireland",
      format: "T20",
      venue: "Greater Noida Sports Complex",
      date: "Mar 18, 6:00 PM",
      isUpcoming: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
          <p className="text-muted-foreground">View all cricket matches - live, recent, and upcoming.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search matches..." className="w-full pl-8" />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Matches</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {allMatches.map((match) => (
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
                {match.isUpcoming && <Badge variant="outline">Upcoming</Badge>}
              </CardHeader>
              <CardContent className="p-4 pt-2">
                {match.score ? (
                  <>
                    <p className="font-medium">{match.score}</p>
                    <p className="text-sm text-muted-foreground mt-1">{match.status}</p>
                  </>
                ) : (
                  <p className="font-medium">{match.date}</p>
                )}
                <Button asChild variant="link" className="p-0 h-auto mt-2">
                  <Link href={`/dashboard/matches/${match.id}`}>
                    {match.isUpcoming ? "Set reminder" : "View details"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="live" className="space-y-4">
          {allMatches
            .filter((match) => match.isLive)
            .map((match) => (
              <Card key={match.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{match.teams}</CardTitle>
                    <CardDescription>
                      {match.format} • {match.venue}
                    </CardDescription>
                  </div>
                  <Badge variant="destructive" className="animate-pulse">
                    LIVE
                  </Badge>
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
          {allMatches
            .filter((match) => match.isUpcoming)
            .map((match) => (
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

        <TabsContent value="completed" className="space-y-4">
          {allMatches
            .filter((match) => !match.isLive && !match.isUpcoming && match.score)
            .map((match) => (
              <Card key={match.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{match.teams}</CardTitle>
                  <CardDescription>
                    {match.format} • {match.venue}
                  </CardDescription>
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
      </Tabs>
    </div>
  )
}

