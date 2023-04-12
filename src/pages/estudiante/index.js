import StudentProtectedRoute from '@/components/StudentProtectedRoute'
export default function Home () {
  return (
    <StudentProtectedRoute>
      <h1>Rol: Estudiante</h1>
    </StudentProtectedRoute>
  )
}
