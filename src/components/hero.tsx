import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr"
import dogImg from '../../public/hero-dog.webp'
import catImg from '../../public/cat-hero.png'
import heroImage from '../../public/hero-driving.png'
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image"

export function Hero(){
    return(
        <section className="relative min-h-[400px] flex items-center overflow-hidden px-8">

            <div 
                className="absolute inset-0 bg-cover bg-center "
                style={{ backgroundImage: `url(${heroImage.src})`}}
            >
               <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70 dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-900/70" />
    </div>
            
            <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#0F172A]">
            Encontre o Instrutor{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                Perfeito
            </span>{" "}
            para Você
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Conectamos alunos a instrutores qualificados de carro e moto. 
            Aprenda a dirigir com segurança e confiança.
          </p>
          
          
          {/* <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Buscar por cidade ou região..." 
                className="pl-10 h-12 border-0 bg-transparent focus-visible:ring-0"
              />
            </div> 
            

            <Button size="lg" className="text-base bg-gradient-to-r h-12 px-8 from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">
              Buscar Instrutores
            </Button>
          </div>*/}
        </div>
      </div> 

        </section>  
    )
}