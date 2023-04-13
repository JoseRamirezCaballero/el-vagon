import AdminProtectedRoute from '@/components/AdminProtectedRoute'
import PageLayout from '@/components/PageLayout'
import FormActividad from '@/components/FormActividad'

export default function Create () {
  return (
    <AdminProtectedRoute>
      <PageLayout isAdmin>
        <FormActividad />
      </PageLayout>
    </AdminProtectedRoute>
  )
}
