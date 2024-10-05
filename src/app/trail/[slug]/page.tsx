import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Flag,
  ArrowRight,
} from "lucide-react";
import Map from "@/components/ui/map";

export default function TrailDetail() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Sundu Trail</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Moderate</Badge>
                <span className="text-sm text-muted-foreground">
                  Length: 5.8 km • Est. 2h 13m
                </span>
              </div>
            </div>

            <div className="flex gap-2 mb-8">
              <Button>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">4.7</span>
            <span className="text-sm text-muted-foreground">(3 Reviews)</span>
          </div>

          <div className="mb-8">
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground">
                Sundu Trail is a 5.8 kilometer moderately trafficked out and
                back trail located near Gobustan, Azerbaijan that offers scenic
                views and is rated as moderate. The trail is primarily used for
                hiking and nature trips.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Trail Information</h2>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold">Difficulty:</span> Moderate
                </li>
                <li>
                  <span className="font-semibold">Length:</span> 5.8 km
                </li>
                <li>
                  <span className="font-semibold">Elevation gain:</span> 200 m
                </li>
                <li>
                  <span className="font-semibold">Route type:</span> Out & back
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Weather</h2>
              <p className="text-center text-4xl font-bold mb-2">22°C</p>
              <p className="text-center text-muted-foreground">Partly cloudy</p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-0">
              <div>
              <Map frozen={true} showPlayButton={false} style={{
          width: '100%',
          height: '200px', // Harita yüksekliği
          position: 'relative',
          borderRadius: 'calc(var(--radius) - 2px)'
        }} />
              </div>

              <Button variant="outline" className="w-full rounded-none rounded-bl-md rounded-br-md">
                Directions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.7</span>
                  <span className="text-sm text-muted-foreground">(3)</span>
                </div>
                <Button variant="outline" size="sm">
                  Write review
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">100% recommend</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">3 reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">0 trip reports</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}