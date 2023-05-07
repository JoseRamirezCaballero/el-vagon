import AdminProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import FormActividad from '@/components/FormActividad'

export default function Create () {
  return (
    <AdminProtectedRoute rol={2}>
      <PageLayout rol={2}>
        <FormActividad />
      </PageLayout>
    </AdminProtectedRoute>
  )
}
