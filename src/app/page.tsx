import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import LocationCard from "@/components/ui/location-card"
import Map from "@/components/ui/map"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-green-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Explore New Trails</h1>
          <p className="text-xl text-gray-600 mb-8">Find the one that suits you best among thousands of hiking trails</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Input className="w-full md:w-96 bg-white" placeholder="Enter location or route name" />
            <Button size="lg">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Trails</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i: number) => (
              <LocationCard key={i} location="Baku, Azerbaijan" name="Shahdili" imageSrc="https://scontent.fgyd20-1.fna.fbcdn.net/v/t1.6435-9/98345437_4127572580587928_7224328024882151424_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=cN1zLX3fl3AQ7kNvgHJTmh_&_nc_ht=scontent.fgyd20-1.fna&_nc_gid=AKRe_-gVW7-yWHXoCaZmFTN&oh=00_AYDZcy2MqimKKNfZLZvo3-5RuABN9cyqQriXEzTUGj_E1g&oe=6728CE2C" />
            ))}
          </div>
        </div>
      </section>


      {/* <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Popüler Kategoriler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Yürüyüş', 'Bisiklet', 'Kamp', 'Doğa Yürüyüşü'].map((category) => (
              <Button key={category} variant="outline" className="h-auto py-8 flex flex-col items-center justify-center">
                <span className="text-lg font-semibold mb-2">{category}</span>
                <ChevronRight size={20} />
              </Button>
            ))}
          </div>
        </div>
      </section> */}

    </div>
  )
}