// Importar el componente "Head" de la biblioteca Next.js
import Head from 'next/head'

// Importar el componente "Register" desde la ubicación relativa "@/components/Register"
import Register from '@/components/Register'

// Definir una función llamada "Registrarse" que se exporta por defecto
export default function Registrarse () {
  // Devolver un JSX que representa la estructura de la página de registro
  return (
    <>
      {/* Componente "Head" para configurar los metadatos y elementos del encabezado de la página */}
      <Head>
        <title>Registrate</title> {/* Establecer el título de la página como "Registrate" */}
        <meta name='description' content='Sistema de Actividades Complementarias' /> {/* Establecer la descripción de la página */}
        <meta name='viewport' content='width=device-width, initial-scale=1' /> {/* Establecer la configuración de la vista para dispositivos móviles */}
        <link rel='icon' href='/favicon.ico' /> {/* Establecer el icono de la página */}
      </Head>
      <Register /> {/* Renderizar el componente "Register" */}
    </>
  )
}
