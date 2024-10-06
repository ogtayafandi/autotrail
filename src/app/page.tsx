"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import LocationCard from "@/components/ui/location-card";
import { useEffect } from "react";
import Locations from "@/api/locations";
import { useLocationStore } from "@/store/locations";

export default function Home() {
  const { locations, setLocations } = useLocationStore();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const fetchedLocations = await Locations.allLocations();
        setLocations(fetchedLocations);
        console.log(fetchedLocations?.data, "fetchedLocations");
      } catch (error) {
        console.error("Məkanları yükləyərkən xəta baş verdi:", error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-green-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Yeni Cığırları Kəşf Edin
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Minlərlə gəzinti cığırı arasından sizə ən uyğun olanı tapın
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Input
              className="w-full md:w-96 bg-white"
              placeholder="Məkan və ya marşrut adını daxil edin"
            />
            <Button size="lg">
              <Search className="mr-2 h-4 w-4" /> Axtar
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Seçilmiş Cığırlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations?.data?.map((item: any, i: number) => (
              <LocationCard
                key={i}
                id={item.id}
                location={`${item.city}, ${item.country}`}
                name={item.name}
                imageSrc={'https://upload.wikimedia.org/wikipedia/commons/f/f4/Qobustan.jpg'}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}