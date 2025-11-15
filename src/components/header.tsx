import { Car, Bike } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export function Header() {
 return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95 px-6">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Car className="h-6 w-6 text-blue-500" />
            <Bike className="h-6 w-6 text-orange-500" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
            AutoAulas
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#instrutores" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-gray-100">
            Instrutores
          </a>
          <a href="#como-funciona" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-gray-100">
            Como Funciona
          </a>
          <a href="#contato" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-gray-100">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/entrar">
            <Button variant="ghost" size="sm" >
              Entrar
            </Button>
          </Link>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"  >
            Cadastrar
          </Button>
        </div>
      </div>
    </header>
  )
}
