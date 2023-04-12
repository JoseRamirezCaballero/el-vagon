import AdminProtectedRoute from '@/components/AdminProtectedRoute'
export default function Home () {
  return (
    <AdminProtectedRoute>
      <h1>Rol: Admin</h1>
    </AdminProtectedRoute>
  )
}
