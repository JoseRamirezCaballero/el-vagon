import AdminProtectedRoute from '@/components/AdminProtectedRoute'
import FormResponsable from '@/components/FormResponsable'
import PageLayout from '@/components/PageLayout'

export default function Create () {
  return (
    <AdminProtectedRoute>
      <PageLayout isAdmin>
        <FormResponsable />
      </PageLayout>
    </AdminProtectedRoute>
  )
}
