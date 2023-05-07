import axios from 'axios'
import StudentProtectedRoute from '@/components/StudentProtectedRoute'
import PageLayout from '@/components/PageLayout'

export default function Home () {
  const logout = async () => {
    await axios.get('/api/auth/logout')
  }

  return (
    <StudentProtectedRoute>
      <PageLayout>
        <h1>Rol: Estudiante</h1>
        <h1>Rol: Estudiante</h1>
        <button onClick={() => logout()}>logout</button>
      </PageLayout>
    </StudentProtectedRoute>
  )
}
