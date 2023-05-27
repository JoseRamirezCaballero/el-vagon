import AdminProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import { ROLES } from '@/utils/constants'

export default function Home () {
  return (
    <AdminProtectedRoute rol={ROLES.ADMINISTRADOR}>
      <PageLayout rol={ROLES.ADMINISTRADOR}>
        <h1>Inicio de Administrador en proceso...</h1>
      </PageLayout>
    </AdminProtectedRoute>
  )
}
