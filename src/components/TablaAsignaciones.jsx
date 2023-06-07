import { axiosAPI } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

export default function TablaInscripciones () {
  const [actividades, setActividades] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredActividades, setFilteredActividades] = useState([])
  const [filterStatus, setFilterStatus] = useState('actual')

  const fechaActual = dayjs()
  const añoActual = fechaActual.format('YYYY')
  const mesActual = fechaActual.format('MM')
  const periodoActual =
    mesActual < '06' ? `ENERO-JUNIO/${añoActual}` : `AGOSTO-DICIEMBRE/${añoActual}`

  const router = useRouter()

  const handleRowClick = (idActividad) => {
    router.push(`/responsable/asignaciones/${idActividad}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await axiosAPI.get('/profile')
        const profileData = profile.data
        const actividadesReponsable = await axiosAPI.get(
          `/actividades/responsable/${profileData.idResponsable}`
        )
        const actividadesData = actividadesReponsable.data
        setActividades(actividadesData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    let filtered = actividades

    if (filterStatus === 'actual') {
      filtered = filtered.filter(actividad => actividad.periodo === periodoActual)
    } else if (filterStatus === 'finalizado') {
      filtered = filtered.filter(actividad => actividad.periodo !== periodoActual)
    }

    filtered = filtered.filter((actividad) =>
      actividad.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      actividad.periodo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      actividad.lugar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      actividad.horario.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredActividades(filtered)
    setIsOpen(false)
  }, [actividades, searchTerm, filterStatus, periodoActual])

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg p-2'>
      <div className='flex items-center justify-between p-4 rounded-tl-lg rounded-tr-lg bg-white dark:bg-gray-900 w-auto'>
        <div>
          <button
            id='dropdownActionButton'
            data-dropdown-toggle='dropdownAction'
            className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
            type='button'
            onClick={toggleDropdown}
          >
            <span className='sr-only'>Action button</span>
            Periodo actual
            <svg
              className={`w-3 h-3 ml-2 ${isOpen ? 'transform rotate-180' : ''}`}
              aria-hidden='true'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
            </svg>
          </button>

          {isOpen && (
            <div
              id='dropdownAction'
              className='z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'
            >
              <ul className='py-1 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownActionButton'>
                <li>
                  <button
                    onClick={() => setFilterStatus('actual')}
                    className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Periodo actual
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setFilterStatus('finalizado')}
                    className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Finalizados
                  </button>
                </li>
              </ul>
            </div>
          )}
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
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Actividad
            </th>
            <th scope='col' className='px-6 py-3'>
              Categoría / Carrera
            </th>
            <th scope='col' className='px-6 py-3'>
              Periodo
            </th>
            <th scope='col' className='px-6 py-3'>
              Lugar
            </th>
            <th scope='col' className='px-6 py-3'>
              Horario
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredActividades.map((actividad) => (
            <tr
              key={actividad.idActividad}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
              onClick={() => handleRowClick(actividad.idActividad)}
            >
              <th scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'>
                <div className='text-base font-semibold'>{actividad.nombre}</div>
              </th>
              <td className='px-6 py-4'>{actividad.carrera ? actividad.carrera : actividad.categoria}</td>
              <td className='px-6 py-4'>{actividad.periodo}</td>
              <td className='px-6 py-4'>{actividad.lugar}</td>
              <td className='px-6 py-4'>{actividad.horario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
