import axios from 'axios'
import ResponsableProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import { ROLES } from '@/utils/constants'

export default function Home () {
  const logout = async () => {
    await axios.get('/api/auth/logout')
  }

  return (
    <ResponsableProtectedRoute rol={ROLES.RESPONSABLE}>
      <PageLayout rol={ROLES.RESPONSABLE}>
        <h1>Rol: Responsable</h1>
        <button onClick={() => logout()}>logout</button>
      </PageLayout>
    </ResponsableProtectedRoute>
  )
}
