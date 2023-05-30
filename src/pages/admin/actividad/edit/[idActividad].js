import { axiosAPI } from '@/utils/constants'
import AdminProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import EditActividad from '@/components/EditActividad'

export default function Edit ({ actividad }) {
  if (!actividad || !actividad.idActividad) {
    return <p>La actividad no existe</p>
  }
  return (
    <AdminProtectedRoute rol={2}>
      <PageLayout rol={2}>
        <EditActividad actividad={actividad} />
      </PageLayout>
    </AdminProtectedRoute>
  )
}

export async function getServerSideProps ({ query, res }) {
  const { idActividad } = query

  if (!idActividad) {
    res.setHeader('location', '/admin/actividad')
    res.statusCode = 302
    res.end()
    return { props: {} }
  }

  try {
    const resActividad = await axiosAPI.get(`/actividades/${idActividad}`)
    const actividad = resActividad.data
    return { props: { actividad } }
  } catch (error) {
    return { props: { actividad: [] } }
  }
}
