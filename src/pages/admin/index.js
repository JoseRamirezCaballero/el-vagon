import axios from 'axios'
import AdminProtectedRoute from '@/components/AdminProtectedRoute'
import PageLayout from '@/components/PageLayout'

export default function Home () {
  const logout = async () => {
    await axios.get('/api/auth/logout')
  }

  return (
    <AdminProtectedRoute>
      <PageLayout isAdmin>
        <h1>Rol: Admin</h1>
        <button onClick={() => logout()}>logout</button>
      </PageLayout>
    </AdminProtectedRoute>
  )
}
