import StudentProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import CardCategory from '@/components/CardCategory'
import { ROLES } from '@/utils/constants'

export default function Categorias () {
  return (
    <StudentProtectedRoute rol={ROLES.ESTUDIANTE}>
      <PageLayout rol={ROLES.ESTUDIANTE}>
        <div className='flex justify-center items-center'>
          <div className='grid grid-cols-2 gap-4'>
            <CardCategory href='/estudiante/categoria/deportiva' title='Actividades Deportivas' description='Las actividades deportivas ofrecen la oportunidad de mantener un estilo de vida saludable y activo mientras te diviertes. Podrás participar en una variedad de deportes como fútbol, baloncesto, voleibol y mucho más.' />
            <CardCategory href='/estudiante/categoria/cultural' title='Actividades Culturales' description='Las actividades culturales te invitan a sumergirte en el rico patrimonio artístico y cultural de nuestra comunidad. Tendrás la oportunidad de explorar diferentes expresiones artísticas, como pintura, música, danza, teatro y literatura.' />
            <CardCategory href='/estudiante/categoria/civica' title='Actividades Cívicas' description='Las actividades cívicas te permiten hacer una diferencia positiva en tu comunidad y contribuir al bienestar de todos. Tendrás la oportunidad de participar en proyectos comunitarios, actividades de voluntariado y campañas de concientización.' />
            <CardCategory href='/estudiante/categoria/carrera' title='Actividades de Carrera' description='Las actividades de carrera te brindan la oportunidad de adquirir experiencia práctica y desarrollar habilidades específicas relacionadas con tu carrera profesional. Podrás realizar pasantías, participar en proyectos relacionados con tu campo de estudio y conectarte con profesionales de la industria.' />
          </div>
        </div>
      </PageLayout>
    </StudentProtectedRoute>
  )
}
