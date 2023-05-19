// Importar el componente "GuestLayout" desde la ubicación relativa "@/components/GuestLayout"
import GuestLayout from '@/components/GuestLayout'

// Importar el componente "Carousel" desde la ubicación relativa "@/components/Carousel"
import Carousel from '@/components/Carousel'

// Definir una función llamada "Home" que se exporta por defecto
export default function Home () {
  // Devolver un JSX que representa la estructura de la página de inicio
  return (
    <GuestLayout>
      <Carousel />
    </GuestLayout>
  )
}