'use client'

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
import { useParams, useRouter } from "next/navigation"

export default function TrailDetail() {
  const params = useParams()  
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Sündü Cığırı</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Orta</Badge>
                <span className="text-sm text-muted-foreground">
                  Uzunluq: 5.8 km • Təxmini 2s 13d
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
            <span className="font-semibold">4.7</span>
            <span className="text-sm text-muted-foreground">(3 Rəy)</span>
          </div>

          <div className="mb-8">
            {/* <Gallery images=[] /> */}
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Təsvir</h2>
              <p className="text-muted-foreground">
                Sündü Cığırı, Qobustan, Azərbaycan yaxınlığında yerləşən 5.8 kilometrlik orta səviyyəli gediş-gəliş
                marşrutudur. Mənzərəli görüntülər təklif edir və orta çətinlikli hesab olunur. Cığır əsasən
                gəzinti və təbiət səyahətləri üçün istifadə olunur.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Cığır Məlumatı</h2>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold">Çətinlik:</span> Orta
                </li>
                <li>
                  <span className="font-semibold">Uzunluq:</span> 5.8 km
                </li>
                <li>
                  <span className="font-semibold">Yüksəklik artımı:</span> 200 m
                </li>
                <li>
                  <span className="font-semibold">Marşrut növü:</span> Gediş-gəliş
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
              <p className="text-center text-muted-foreground">Qismən buludlu</p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-0">
              <div>
              <Map frozen={true} showPlayButton={false} style={{
          width: '100%',
          height: '200px',
          position: 'relative',
          borderRadius: 'calc(var(--radius) - 2px)'
        }} />
              </div>

              <Button variant="outline" className="w-full rounded-none rounded-bl-md rounded-br-md" onClick={() => router.push(`${params.slug}/map`)}>
                İstiqamət
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Rəylər</h2>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.7</span>
                  <span className="text-sm text-muted-foreground">(3)</span>
                </div>
                <Button variant="outline" size="sm">
                  Rəy yaz
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">100% tövsiyə edir</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">3 rəy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">0 səyahət hesabatı</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}