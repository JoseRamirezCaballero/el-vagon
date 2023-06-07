import { useState } from 'react'
import ListaEstudiantes from '@/components/ListaEstudiantes'
import ConstanciasPDF from '@/components/ConstanciasPDF'

export default function TablaInscritos ({ actividades }) {
  const estudiantes = actividades.map((actividad) => actividad.Estudiante)
  const [searchTerm, setSearchTerm] = useState('')
  const filteredEstudiantes = estudiantes.filter((estudiante) => {
    const nombreCompleto = `${estudiante.nombres} ${estudiante.apellidos}`.toLowerCase()
    return nombreCompleto.includes(searchTerm.toLowerCase()) ||
        estudiante.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.numero_control.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.carrera.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.genero.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg p-2'>
      <div className='flex items-center justify-between p-4 rounded-tl-lg rounded-tr-lg bg-white dark:bg-gray-900 w-auto'>
        <div>
          <ListaEstudiantes estudiantes={estudiantes} />
        </div>
        <label htmlFor='table-search' className='sr-only'>
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <input
            type='text'
            id='table-search-users'
            className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-40 sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Buscar actividad'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Nombre
            </th>
            <th scope='col' className='px-6 py-3'>
              Número de control
            </th>
            <th scope='col' className='px-6 py-3'>
              Carrera
            </th>
            <th scope='col' className='px-6 py-3'>
              Género
            </th>
            <th scope='col' className='px-6 py-3'>
              Constancias
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEstudiantes.map((estudiante) => (
            <tr
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
              key={estudiante.idEstudiante}
            >
              <th
                scope='row'
                className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
              >
                <div className='text-base font-semibold'>{`${estudiante.nombres} ${estudiante.apellidos}`}</div>
              </th>
              <td className='px-6 py-4'>{estudiante.numero_control}</td>
              <td className='px-6 py-4'>{estudiante.carrera}</td>
              <td className='px-6 py-4'>{estudiante.genero}</td>
              <td className='px-6 py-4'>
                <ConstanciasPDF estudiante={estudiante} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
