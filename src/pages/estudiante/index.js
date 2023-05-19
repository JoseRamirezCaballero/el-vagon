import axios from 'axios'  // Importamos la biblioteca Axios para realizar peticiones HTTP.
import StudentProtectedRoute from '@/components/ProtectedRoute'  // Importamos el componente de ruta protegida para estudiantes.
import PageLayout from '@/components/PageLayout'  // Importamos el componente de diseño de página.
import { ROLES } from '@/utils/constants'  // Importamos la constante de roles definida en los archivos de constantes.

export default function Home () {
  const logout = async () => {
    await axios.get('/api/auth/logout')  // Función para realizar una solicitud GET a la ruta "/api/auth/logout" al hacer clic en "logout".
  }

  return (
    <StudentProtectedRoute rol={ROLES.ESTUDIANTE}>  // Componente de ruta protegida para estudiantes.
      <PageLayout rol={ROLES.ESTUDIANTE}>  // Componente de diseño de página para estudiantes.
        <h1>Rol: Estudiante</h1>  // Título de la página que muestra el rol del usuario como "Estudiante".
        <button onClick={() => logout()}>logout</button>  // Botón para cerrar sesión que invoca la función "logout".
      </PageLayout>
    </StudentProtectedRoute>
  )
}

