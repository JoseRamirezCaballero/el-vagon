import AdminProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import FormActividad from '@/components/FormActividad'
import { ROLES } from '@/utils/constants'

export default function Create () {
  return (
    <AdminProtectedRoute rol={ROLES.ADMINISTRADOR}>
      <PageLayout rol={ROLES.ADMINISTRADOR}>
        <FormActividad />
      </PageLayout>
    </AdminProtectedRoute>
  )
}
