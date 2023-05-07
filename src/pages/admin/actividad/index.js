import AdminProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import TablaActividades from '@/components/TablaActividades'
import axios from 'axios'

export default function Dashboard ({ actividades }) {
  const columnas = [
    { titulo: 'Actividad' },
    { titulo: 'Responsable' },
    { titulo: 'Horario' },
    { titulo: 'Lugar' },
    { titulo: 'Periodo' },
    { titulo: 'Creditos' },
    { titulo: 'Cupos' },
    { titulo: 'Estatus' }
  ]

  return (
    <AdminProtectedRoute rol={2}>
      <PageLayout rol={2}>
        <TablaActividades datos={actividades} columnas={columnas} />
      </PageLayout>
    </AdminProtectedRoute>
  )
}

export async function getServerSideProps () {
  try {
    const resActividades = await axios.get('http://localhost:3000/api/actividades')
    const actividades = resActividades.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return { props: { actividades } }
  } catch (error) {
    return { props: { actividades: [] } }
  }
}
