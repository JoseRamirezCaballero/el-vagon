import AdminProtectedRoute from '@/components/ProtectedRoute'
import FormResponsable from '@/components/FormResponsable'
import PageLayout from '@/components/PageLayout'
import { ROLES } from '@/utils/constants'

export default function Create () {
  return (
    <AdminProtectedRoute rol={ROLES.ADMINISTRADOR}>
      <PageLayout rol={ROLES.ADMINISTRADOR}>
        <FormResponsable />
      </PageLayout>
    </AdminProtectedRoute>
  )
}
