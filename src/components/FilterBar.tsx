import { Car, Bike, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  activeFilter: "all" | "car" | "moto";
  setActiveFilter: (filter: "all" | "car" | "moto") => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (neighborhood: string) => void;
  states: string[];
  cities: string[];
  neighborhoods: string[];
}

const FilterBar = ({
  activeFilter,
  setActiveFilter,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  selectedNeighborhood,
  setSelectedNeighborhood,
  states,
  cities,
  neighborhoods,
}: FilterBarProps) => {

  return (
    <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-16 z-40 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="container py-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filtrar por:
            </span>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("all")}
              >
                Todos
              </Button>
              <Button
                variant={activeFilter === "car" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("car")}
                className="gap-2"
              >
                <Car className="h-4 w-4" />
                Carro
              </Button>
              <Button
                variant={activeFilter === "moto" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("moto")}
                className="gap-2"
              >
                <Bike className="h-4 w-4" />
                Moto
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-500">
              Localização:
            </span>
          
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Estados</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Cidades</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Bairro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Bairros</SelectItem>
                {neighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;