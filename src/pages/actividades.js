import PageLayout from '@/components/PageLayout'

export default function Actividades () {
  return (
    <PageLayout title='Actividades'>

      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Actividad
              </th>
              <th scope='col' className='px-6 py-3'>
                Docente
              </th>
              <th scope='col' className='px-6 py-3'>
                Horario
              </th>
              <th scope='col' className='px-6 py-3'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                Futbol
              </th>
              <td className='px-6 py-4'>
                null
              </td>
              <td className='px-6 py-4'>
                12:00 - 13:00
              </td>
              <td className='px-6 py-4'>
                Registrarme
              </td>
            </tr>
            <tr className='bg-white dark:bg-gray-800'>
              <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                Danza
              </th>
              <td className='px-6 py-4'>
                null
              </td>
              <td className='px-6 py-4'>
                12:00 - 13:00
              </td>
              <td className='px-6 py-4'>
                Registrarme
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </PageLayout>
  )
}
