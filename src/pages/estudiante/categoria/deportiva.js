import StudentProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import CardActividad from '@/components/CardActividad'
import { ROLES, axiosAPI } from '@/utils/constants'

export default function Deportiva ({ actividades }) {
  return (
    <StudentProtectedRoute rol={ROLES.ESTUDIANTE}>
      <PageLayout rol={ROLES.ESTUDIANTE}>
        <div className='flex justify-center mb-2'>
          <h1 className='mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl'>Actividades <span className='text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-amber-400'>Deportivas</span></h1>
        </div>
        <CardActividad actividades={actividades} />
      </PageLayout>
    </StudentProtectedRoute>
  )
}

export async function getServerSideProps () {
  try {
    const response = await axiosAPI.get('/actividades')
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
