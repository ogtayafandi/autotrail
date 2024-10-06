"use client";

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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import Locations from "@/api/locations";

export default function TrailDetail() {
  const params = useParams();
  const router = useRouter();
  const [location, setLocation] = useState<any>()

  useLayoutEffect(() => {
    const fetchLocations = async () => {
      try {
        const fetchedLocations = await Locations.getSingleLocation(params?.slug);
        setLocation(fetchedLocations);
        console.log(fetchedLocations?.data, "fetchedLocations");
      } catch (error) {
        console.error("Məkanları yükləyərkən xəta baş verdi:", error);
      }
    };
    fetchLocations();
  }, []);

  console.log(location, 'location');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{location?.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{location?.diff}</Badge>
                <span className="text-sm text-muted-foreground">
                  Uzunluq: {location?.distance} m • Təxmini 2s 13d
                </span>
              </div>
            </div>

            <div className="flex gap-2 mb-8">
              <Button>
                <Share2 className="w-4 h-4 mr-2" />
                Paylaş
              </Button>
              <Button variant="outline">
                <Bookmark className="w-4 h-4 mr-2" />
                Yadda saxla
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{location?.average_star}</span>
            <span className="text-sm text-muted-foreground">({location?.review_count} Rəy)</span>
          </div>

          <div className="mb-8">{/* <Gallery images=[] /> */}</div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Təsvir</h2>
              <p className="text-muted-foreground">
                {location?.description}
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Cığır Məlumatı</h2>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold">Çətinlik:</span> {location?.diff}
                </li>
                <li>
                  <span className="font-semibold">Məsafə:</span> {location?.distance} m
                </li>
                <li>
                  <span className="font-semibold">Yüksəklik artımı:</span> {location?.elevation} m
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Hava</h2>
              <p className="text-center text-4xl font-bold mb-2">22°C</p>
              <p className="text-center text-muted-foreground">
                Qismən buludlu
              </p>
            </CardContent>
          </Card>

              <Button
                variant="outline"
                className="mb-8 w-full rounded-md"
                onClick={() => router.push(`${params.slug}/map`)}
              >
                İstiqamət
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Rəylər</h2>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{location?.average_star}</span>
                  <span className="text-sm text-muted-foreground">({location?.review_count})</span>
                </div>
                <Button variant="outline" size="sm">
                  Rəy yaz
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{location?.review_count} rəy</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}