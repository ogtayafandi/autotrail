import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import LocationCard from "@/components/ui/location-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-green-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Yeni Cığırları Kəşf Edin</h1>
          <p className="text-xl text-gray-600 mb-8">Minlərlə gəzinti cığırı arasından sizə ən uyğun olanı tapın</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Input className="w-full md:w-96 bg-white" placeholder="Məkan və ya marşrut adını daxil edin" />
            <Button size="lg">
              <Search className="mr-2 h-4 w-4" /> Axtar
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Seçilmiş Cığırlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i: number) => (
              <LocationCard key={i} id={i} location="Bakı, Azərbaycan" name="Şahdili" imageSrc="https://scontent.fgyd20-1.fna.fbcdn.net/v/t1.6435-9/98345437_4127572580587928_7224328024882151424_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=cN1zLX3fl3AQ7kNvgHJTmh_&_nc_ht=scontent.fgyd20-1.fna&_nc_gid=AKRe_-gVW7-yWHXoCaZmFTN&oh=00_AYDZcy2MqimKKNfZLZvo3-5RuABN9cyqQriXEzTUGj_E1g&oe=6728CE2C" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}