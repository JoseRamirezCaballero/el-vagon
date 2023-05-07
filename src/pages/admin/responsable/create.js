import AdminProtectedRoute from '@/components/ProtectedRoute'
import FormResponsable from '@/components/FormResponsable'
import PageLayout from '@/components/PageLayout'

export default function Create () {
  return (
    <AdminProtectedRoute rol={2}>
      <PageLayout rol={2}>
        <FormResponsable />
      </PageLayout>
    </AdminProtectedRoute>
  )
}
