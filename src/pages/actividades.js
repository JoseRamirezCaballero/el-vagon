import PageLayout from '@/components/PageLayout'

export default function Actividades ({ actividades }) {
  return (
    <PageLayout>

      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Actividad
              </th>
              <th scope='col' className='px-6 py-3'>
                Responsable
              </th>
              <th scope='col' className='px-6 py-3'>
                Horario
              </th>
              <th scope='col' className='px-6 py-3'>
                Lugar
              </th>
              <th scope='col' className='px-6 py-3'>
                Periodo
              </th>
              <th scope='col' className='px-6 py-3'>
                Creditos
              </th>
              <th scope='col' className='px-6 py-3'>
                Cupos
              </th>
              <th scope='col' className='px-6 py-3'>
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {actividades.map((actividad, index) => (
              <tr
                key={index}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {actividad.nombre}
                </th>
                <td className='px-6 py-4'>{actividad.horario}</td>
                <td className='px-6 py-4'>{actividad.horario}</td>
                <td className='px-6 py-4'>{actividad.lugar}</td>
                <td className='px-6 py-4'>{actividad.periodo}</td>
                <td className='px-6 py-4'>{actividad.creditos}</td>
                <td className='px-6 py-4'>{actividad.capacidad_maxima}</td>
                <td className='px-6 py-4'>Registrarse</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </PageLayout>
  )
}

export async function getStaticProps () {
  const res = await fetch('http://localhost:3000/api/actividades')
  const actividades = await res.json()

  return {
    props: {
      actividades
    },
    revalidate: 10 // tiempo en segundos para regenerar la página
  }
}
