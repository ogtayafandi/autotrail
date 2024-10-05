import Image from "next/image"
import { Star, MapPin, Camera, Navigation, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Map from "@/components/ui/map"

export default function TrailDetail() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-96 overflow-y-auto border-r">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Sundu Trail</h1>
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" />
              ))}
              <Star className="w-4 h-4 text-yellow-400" />
            </div>
            <span className="text-sm text-gray-600">(13)</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            <MapPin className="inline-block mr-1 w-4 h-4" />
            Sündü, Qobustan, Azərbaycan
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
            <div>
              <h3 className="font-semibold">Məsafə</h3>
              <p>8.2 km</p>
            </div>
            <div>
              <h3 className="font-semibold">Yüksəklik artımı</h3>
              <p>438 m</p>
            </div>
            <div>
              <h3 className="font-semibold">Tip</h3>
              <p>Dairəvi</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-6">
            Sündü yaxınlığında 8.2 km-lik dairəvi cığırı kəşf edin. Ümumiyyətlə, orta çətinlikli marşrut hesab
            olunur və tamamlanması orta hesabla 2 saat 59 dəqiqə çəkir. Bu, çox populyar bir ərazidir...
          </p>
          <Button className="w-full mb-4">Cığırı önizlə</Button>
          <div className="flex justify-between mb-6">
            <Button variant="outline" size="icon">
              <Camera className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Navigation className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">Haqqında</TabsTrigger>
              <TabsTrigger value="reviews">Rəylər</TabsTrigger>
              <TabsTrigger value="weather">Hava</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <h2 className="font-semibold mb-2">Cığır vəziyyəti</h2>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Təmiz</span>
                    <span>73%</span>
                  </div>
                  <Progress value={73} className="w-full" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Kölgəli</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="w-full" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mənzərəli</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="w-full" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <p className="text-sm text-gray-600">Rəylər burada göstəriləcək.</p>
            </TabsContent>
            <TabsContent value="weather">
              <div className="space-y-2 text-sm">
                <p>Bugün: 25°C, Günəşli</p>
                <p>Sabah: 23°C, Qismən buludlu</p>
                <p>Bazar: 22°C, Yağışlı</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <Map
          frozen={false}
          showPlayButton={false}
          style={{
            width: '100%',
            height: '100%', // Xəritənin hündürlüyünü 100% etdik
            position: 'absolute', // Mütləq mövqe təyin etdik
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </div>
    </div>
  )
}