'use client'

import { useState, useEffect } from "react";
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Bike } from "lucide-react";
import { z } from "zod";
import Link from 'next/link'
import { useRouter } from 'next/navigation' 


export default function EntrarPage({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
 const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
 
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      })
      if (error) throw error
      router.push('/perfil')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4 ">
            <div className="flex items-center gap-1">
              <Car className="h-8 w-8 text-accent text-blue-500" />
              <Bike className="h-8 w-8 text-accent text-orange-500" />
            </div>
          </div>          
           
          <h2 className="text-3xl md:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
              AutoAulas
            </span>
          </h2>  
          
          <CardDescription>
            Conecte-se com instrutores de direção ou cadastre-se como instrutor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                  
                    placeholder="m@example.com"
                    required
           
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input
               
                    required
              
                  />
                </div>
                <Button type="submit" 
                className="w-full bg-[#4285F4] hover:bg-[#3b78e7] text-white font-medium 
                py-3 rounded-md transition"
                   >
                   Entrar
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nome Completo</Label>
                  <Input 
                    type="text"
                    placeholder="Seu nome" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <Button
                    type="submit"
                    className="w-full bg-[#4285F4] hover:bg-[#3b78e7] text-white 
                    font-medium py-3 rounded-md transition"
                    disabled={isLoading}                  
                  >
                    
                    {isLoading ? 'Criando conta...' : 'Criar Conta'}
                </Button>
                {error && <p className="text-sm text-red-500">{error}</p>}
                 
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
    </main>
  );
}
