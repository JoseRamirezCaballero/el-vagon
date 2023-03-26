import PageLayout from '@/components/PageLayout'
import TablaActividades from '@/components/TablaActividades'
import axios from 'axios'

export default function readActividades ({ actividades }) {
  const columnas = [
    { titulo: 'Actividad' },
    { titulo: 'Responsable' },
    { titulo: 'Horario' },
    { titulo: 'Lugar' },
    { titulo: 'Periodo' },
    { titulo: 'Creditos' },
    { titulo: 'Cupos' },
    { titulo: 'Opciones' }
  ]
  return (
    <PageLayout>
      <TablaActividades datos={actividades} columnas={columnas} />
    </PageLayout>
  )
}

export async function getServerSideProps () {
  try {
    const resActividades = await axios.get('http://localhost:3000/api/actividades')
    const actividades = resActividades.data.sort((a, b) => a.nombre.localeCompare(b.nombre))

    return { props: { actividades } }
  } catch (error) {
    console.error(error)
    return { props: { actividades: [] } }
  }
}
