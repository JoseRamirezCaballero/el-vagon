import axios from 'axios'
import AdminProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'

export default function Home () {
  const logout = async () => {
    await axios.get('/api/auth/logout')
  }

  return (
    <AdminProtectedRoute rol={2}>
      <PageLayout rol={2}>
        <h1>Rol: Admin</h1>
        <button onClick={() => logout()}>logout</button>
      </PageLayout>
    </AdminProtectedRoute>
  )
}
