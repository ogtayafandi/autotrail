'use client'
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

interface LocationCardProps {
  id: number;
  name: string;
  location: string;
  imageSrc: string;
}

const LocationCard = ({ id, location, name, imageSrc }: LocationCardProps) => {
  const route = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="flex items-center">
          <MapPin className="inline mr-1" size={16} />
          {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={imageSrc}
          alt="Trail"
          className="w-full h-48 object-cover rounded-md"
        />
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => route.push(`trail/${id}`)}>
          Detallı baxış
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocationCard;
