import ResponsableProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import { ROLES } from '@/utils/constants'

export default function Home () {
  return (
    <ResponsableProtectedRoute rol={ROLES.RESPONSABLE}>
      <PageLayout rol={ROLES.RESPONSABLE}>
        <h1>Inicio de Responsable en proceso...</h1>
      </PageLayout>
    </ResponsableProtectedRoute>
  )
}
