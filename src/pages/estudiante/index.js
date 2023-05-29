import StudentProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import { ROLES } from '@/utils/constants'

export default function Home () {
  return (
    <StudentProtectedRoute rol={ROLES.ESTUDIANTE}>
      <PageLayout rol={ROLES.ESTUDIANTE}>
        <h1>En proceso</h1>
      </PageLayout>
    </StudentProtectedRoute>
  )
}
