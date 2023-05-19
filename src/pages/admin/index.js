import axios from 'axios'
import AdminProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import { ROLES } from '@/utils/constants'

export default function Home () {
  const logout = async () => {
    await axios.get('/api/auth/logout')
  }

  return (
    <AdminProtectedRoute rol={ROLES.ADMINISTRADOR}>
      <PageLayout rol={ROLES.ADMINISTRADOR}>
        <h1>Rol: Admin</h1>
        <button onClick={() => logout()}>logout</button>
      </PageLayout>
    </AdminProtectedRoute>
  )
}
