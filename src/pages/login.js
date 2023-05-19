// Importar el componente "Head" de la biblioteca Next.js
import Head from 'next/head'

// Importar el componente "Login" desde la ubicación relativa "@/components/Login"
import Login from '@/components/Login'

// Definir una función llamada "InciarSesion" que se exporta por defecto
export default function InciarSesion () {
  // Devolver un JSX que representa la estructura de la página de inicio de sesión
  return (
    <>
      {/* Componente "Head" para configurar los metadatos y elementos del encabezado de la página */}
      <Head>
        <title>Inicia Sesión</title> {/* Establecer el título de la página como "Inicia Sesión" */}
        <meta name='description' content='Actividades Complementarias' /> {/* Establecer la descripción de la página */}
        <meta name='viewport' content='width=device-width, initial-scale=1' /> {/* Establecer la configuración de la vista para dispositivos móviles */}
        <link rel='icon' href='/favicon.ico' /> {/* Establecer el icono de la página */}
      </Head>
      <Login /> {/* Renderizar el componente "Login" */}
    </>
  )
}
