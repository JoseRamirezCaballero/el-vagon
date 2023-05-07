import axios from 'axios'
import StudentProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'

export default function Home () {
  const logout = async () => {
    await axios.get('/api/auth/logout')
  }

  return (
    <StudentProtectedRoute rol={1}>
      <PageLayout rol={1}>
        <h1>Rol: Estudiante</h1>
        <h1>Rol: Estudiante</h1>
        <button onClick={() => logout()}>logout</button>
      </PageLayout>
    </StudentProtectedRoute>
  )
}
