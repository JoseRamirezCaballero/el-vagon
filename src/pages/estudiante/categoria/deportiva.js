import StudentProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import CardActividad from '@/components/CardActividad'
import { ROLES } from '@/utils/constants'
import axios from 'axios'

export default function Deportiva ({ actividades }) {
  return (
    <StudentProtectedRoute rol={ROLES.ESTUDIANTE}>
      <PageLayout rol={ROLES.ESTUDIANTE}>
        <CardActividad actividades={actividades} />
      </PageLayout>
    </StudentProtectedRoute>
  )
}

export async function getServerSideProps () {
  try {
    const response = await axios.get('http://localhost:3000/api/actividades')
    const actividades = response.data.filter(
      actividad => actividad.categoria === 'DEPORTIVA' && actividad.estatus
    )
    return {
      props: { actividades }
    }
  } catch (error) {
    console.error('Error al obtener las actividades:', error)
    return {
      props: { actividades: [] }
    }
  }
}
