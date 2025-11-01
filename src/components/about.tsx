import { Star, Car, Bike, MapPin, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import InstructorCard from "@/components/InstructorCard";
import { instructors } from "@/data/instructors";
import { useState, useMemo } from "react";
 

export function About(){
    return (
    <div className="min-h-screen bg-background">
           
      <section id="instrutores" className="container py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nossos Instrutores{" "}
            <span className="bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
              Certificados
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Profissionais experientes e altamente qualificados prontos para te ajudar a conquistar sua habilitação
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-8">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} {...instructor} />
          ))}
        </div>
      </section>
      
      <section id="como-funciona" className="bg-[#F9FAFB] py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Como Funciona
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Encontre seu instrutor ideal em 3 passos simples
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
      {/* Passo 1 */}
      <div>
        <div className="w-16 h-16 rounded-full bg-[#4F8DF5] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-sm">
          1
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Busque</h3>
        <p className="text-gray-600 leading-relaxed">
          Encontre instrutores na sua região usando nosso sistema de busca
        </p>
      </div>

      {/* Passo 2 */}
      <div>
        <div className="w-16 h-16 rounded-full bg-[#4F8DF5] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-sm">
          2
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Compare</h3>
        <p className="text-gray-600 leading-relaxed">
          Veja avaliações, especialidades e escolha o melhor para você
        </p>
      </div>

      {/* Passo 3 */}
      <div>
        <div className="w-16 h-16 rounded-full bg-[#F97316] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-sm">
          3
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Aprenda</h3>
        <p className="text-gray-600 leading-relaxed">
          Entre em contato e comece suas aulas com confiança
        </p>
      </div>
    </div>
  </div>
</section>

      
      <footer className="border-t border-border py-8 mt-20">
        <div className="container text-center text-muted-foreground">
          <p>© 2025 AutoAulas. Conectando alunos e instrutores com segurança. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}