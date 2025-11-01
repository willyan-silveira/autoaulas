import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import heroImage from "../assets/hero-driving.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
      </div>
      
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Encontre o Instrutor{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Perfeito
            </span>{" "}
            para Você
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Conectamos alunos a instrutores qualificados de carro e moto. 
            Aprenda a dirigir com segurança e confiança.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-lg shadow-lg">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Buscar por cidade ou região..." 
                className="pl-10 h-12 border-0 bg-transparent focus-visible:ring-0"
              />
            </div>
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 h-12 px-8">
              Buscar Instrutores
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
