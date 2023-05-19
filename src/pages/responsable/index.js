// Importar la biblioteca Axios para realizar peticiones HTTP
import axios from 'axios'

// Importar el componente "ResponsableProtectedRoute" desde la ubicación relativa "@/components/ProtectedRoute"
import ResponsableProtectedRoute from '@/components/ProtectedRoute'

// Importar el componente "PageLayout" desde la ubicación relativa "@/components/PageLayout"
import PageLayout from '@/components/PageLayout'

// Importar el objeto "ROLES" desde la ubicación relativa "@/utils/constants"
import { ROLES } from '@/utils/constants'

// Definir una función llamada "Home" que se exporta por defecto
export default function Home () {
  // Definir una función de cierre de sesión
  const logout = async () => {
    await axios.get('/api/auth/logout') // Realizar una petición GET a la ruta "/api/auth/logout" para cerrar sesión
  }

  // Devolver un JSX que representa la estructura de la página de inicio
  return (
    <ResponsableProtectedRoute rol={ROLES.RESPONSABLE}>
      {/* Componente "PageLayout" para definir el diseño de la página */}
      <PageLayout rol={ROLES.RESPONSABLE}>
        <h1>Rol: Responsable</h1> {/* Título de la página */}
        <button onClick={() => logout()}>logout</button> {/* Botón de cierre de sesión */}
      </PageLayout>
    </ResponsableProtectedRoute>
  )
}
