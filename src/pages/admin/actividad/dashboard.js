import AdminProtectedRoute from '@/components/AdminProtectedRoute'
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
    <AdminProtectedRoute>
      <PageLayout isAdmin>
        <TablaActividades datos={actividades} columnas={columnas} />
      </PageLayout>
    </AdminProtectedRoute>
  )
}

export async function getServerSideProps () {
  try {
    const resActividades = await axios.get('http://localhost:3000/api/actividades')
    const actividades = resActividades.data.sort((a, b) => a.nombre.localeCompare(b.nombre))
    return { props: { actividades } }
  } catch (error) {
    return { props: { actividades: [] } }
  }
}
