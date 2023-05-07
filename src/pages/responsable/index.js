import axios from 'axios'
import ResponsableProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'

export default function Home () {
  const logout = async () => {
    await axios.get('/api/auth/logout')
  }

  return (
    <ResponsableProtectedRoute rol={3}>
      <PageLayout rol={3}>
        <h1>Rol: Responsable</h1>
        <button onClick={() => logout()}>logout</button>
      </PageLayout>
    </ResponsableProtectedRoute>
  )
}
