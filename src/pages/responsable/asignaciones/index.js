import ResponsableProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import TablaAsignaciones from '@/components/TablaAsignaciones'
import { ROLES } from '@/utils/constants'

export default function Asignaciones () {
  return (
    <ResponsableProtectedRoute rol={ROLES.RESPONSABLE}>
      <PageLayout rol={ROLES.RESPONSABLE}>
        <TablaAsignaciones />
      </PageLayout>
    </ResponsableProtectedRoute>
  )
}
