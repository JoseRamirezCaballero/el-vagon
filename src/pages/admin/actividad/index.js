import AdminProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import TablaActividades from '@/components/TablaActividades'
import { ROLES, axiosAPI } from '@/utils/constants'

export default function Dashboard ({ actividades }) {
  const columnas = [
    { titulo: 'Actividad' },
    { titulo: 'Responsable' },
    { titulo: 'Horario' },
    { titulo: 'Lugar' },
    { titulo: 'Período' },
    { titulo: 'Créditos' },
    { titulo: 'Cupos' },
    { titulo: 'Acciones' }
  ]

  return (
    <AdminProtectedRoute rol={ROLES.ADMINISTRADOR}>
      <PageLayout rol={ROLES.ADMINISTRADOR}>
        <TablaActividades datos={actividades} columnas={columnas} />
      </PageLayout>
    </AdminProtectedRoute>
  )
}

export async function getServerSideProps () {
  try {
    const resActividades = await axiosAPI.get('/actividades')
    const actividades = resActividades.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return { props: { actividades } }
  } catch (error) {
    return { props: { actividades: [] } }
  }
}
