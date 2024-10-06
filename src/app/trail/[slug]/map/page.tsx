'use client'
import Image from "next/image"
import { useLayoutEffect, useState } from "react"
import { Star, MapPin, Camera, Navigation, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Map from "@/components/ui/map"
import { useParams } from "next/navigation"
import locations from "@/api/locations"

export default function TrailDetail() {
  const params = useParams();

  const [isPlaying, setIsPlaying] = useState(false); // Oynatma durumu
  const [location, setLocation] = useState<any>()

  useLayoutEffect(() => {
    const fetchLocations = async () => {
      try {
        const fetchedLocations = await locations.getSingleLocation(params?.slug as string);
        setLocation(fetchedLocations);
        console.log(fetchedLocations?.data, "fetchedLocations");
      } catch (error) {
        console.error("Məkanları yükləyərkən xəta baş verdi:", error);
      }
    };
    fetchLocations();
  }, []);


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-96 overflow-y-auto border-r">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{location?.name}</h1>
          <div className="flex items-center space-x-2 mb-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{location?.average_star}</span>
            <span className="text-sm text-muted-foreground">({location?.review_count} Rəy)</span>
          </div>
          <p className="text-sm text-gray-600 mb-4 flex items-center">
            <MapPin className="inline-block mr-1 w-4 h-4" />
            {location?.address}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <h3 className="font-semibold">Məsafə</h3>
              <p>{location?.distance} km</p>
            </div>
            <div>
              <h3 className="font-semibold">Yüksəklik artımı</h3>
              <p>{location?.elevation} m</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-6">
          {location?.description}
          </p>
          <Button className="w-full mb-4" onClick={() => setIsPlaying(true)}>Cığırı önizlə</Button>
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">Rəylər</TabsTrigger>
              <TabsTrigger value="weather">Hava</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews">
              <p className="text-sm text-gray-600">Rəylər burada göstəriləcək.</p>
            </TabsContent>
            <TabsContent value="weather">
              <div className="space-y-2 text-sm">
                <p>Bugün: 22°C, Qismən buludlu</p>
                <p>Sabah: 23°C, Qismən buludlu</p>
                <p>Bazar: 22°C, Yağışlı</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

   
      {
        location?.map?.geometry?.coordinates && <div className="flex-1 relative">
          <Map
            frozen={false}
            showPlayButton={true}
            isPlaying={isPlaying}
            segments={location?.map?.geometry?.coordinates ?? []}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </div>
      }
    </div>
  )
}