import axios from 'axios'
import PageLayout from '@/components/PageLayout'

export default function Actividades ({ actividades }) {
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
      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              {columnas.map((columna, index) => (
                <th key={index} scope='col' className='px-6 py-3'>
                  {columna.titulo}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {actividades.map((actividad, index) => (
              <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {actividad.nombre}
                </th>
                <td className='px-6 py-4'>{`${actividad['responsable.abreviatura_cargo']} ${actividad['responsable.nombres']} ${actividad['responsable.apellidos']}`}</td>
                <td className='px-6 py-4'>{actividad.horario}</td>
                <td className='px-6 py-4'>{actividad.lugar}</td>
                <td className='px-6 py-4'>{actividad.periodo}</td>
                <td className='px-6 py-4'>{actividad.creditos}</td>
                <td className='px-6 py-4'>{actividad.capacidad_maxima}</td>
                <td className='px-6 py-4'>En proceso</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  )
}

export async function getServerSideProps () {
  try {
    const resActividades = await axios.get('http://localhost:3000/api/actividades')
    const actividades = resActividades.data

    return { props: { actividades } }
  } catch (error) {
    console.error(error)
    return { props: { actividades: [] } }
  }
}
