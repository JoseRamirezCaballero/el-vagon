import StudentProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import CardActividad from '@/components/CardActividad'
import { ROLES, axiosAPI } from '@/utils/constants'

export default function Carrera ({ actividades }) {
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
    const response = await axiosAPI.get('/actividades')
    const actividades = response.data.filter(
      actividad => actividad.categoria === 'CARRERA' && actividad.estatus
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
