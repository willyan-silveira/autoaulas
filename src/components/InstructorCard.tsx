import { Star, Car, Bike, MapPin, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface InstructorCardProps {
  name: string;
  age: number;
  rating: number;
  reviewCount: number;
  summary: string;
  photo: string;
  specialties: readonly ("car" | "moto")[];
  state: string;
  city: string;
  neighborhood: string;
  isVerified?: boolean;
}

const InstructorCard = ({
  name,
  age,
  rating,
  reviewCount,
  summary,
  photo,
  specialties,
  state,
  city,
  neighborhood,
  isVerified = false,
}: InstructorCardProps) => {
  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 ${
      isVerified 
        ? "border-blue-500/50 hover:border-blue-500/70" 
        : "border-gray-200 dark:border-gray-700"
    }`}>
      <CardContent className="p-6">
        <div className="flex gap-4 mb-4">
          <Avatar className="h-20 w-20 ring-2 ring-blue-500/10 group-hover:ring-blue-500/30 transition-all">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg truncate">{name}</h3>
              {isVerified && (
                <BadgeCheck className="h-5 w-5 text-blue-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">{age} anos</p>
            
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "fill-orange-500 text-orange-500"
                      : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">({reviewCount})</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {specialties.includes("car") && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Car className="h-3 w-3" />
                  Carro
                </Badge>
              )}
              {specialties.includes("moto") && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Bike className="h-3 w-3" />
                  Moto
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 dark:text-gray-300">
          {summary}
        </p>
        
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          {neighborhood}, {city} - {state}
        </div>

         <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 group-hover:shadow-md transition-all">
          Ver Perfil
        </Button>
      </CardContent>

    </Card>
  );
};

export default InstructorCard;
