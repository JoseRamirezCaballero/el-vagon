import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function TablaActividades ({ columnas, datos }) {
  const router = useRouter()
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('TODAS')
  const [isOpen, setIsOpen] = useState(false)
  const [busqueda, setBusqueda] = useState('')

  const filtros = [
    { filtrar: 'TODAS' },
    { filtrar: 'DEPORTIVA' },
    { filtrar: 'CULTURAL' },
    { filtrar: 'CIVICA' },
    { filtrar: 'CARRERA' }
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const cerrarMenu = () => {
    setIsOpen(false)
  }

  const seleccionarFiltro = (filtro) => {
    setFiltroSeleccionado(filtro)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownButton = document.getElementById('dropdown-button')
      const dropdown = document.getElementById('dropdown')
      if (!dropdownButton.contains(event.target) && dropdown && !dropdown.contains(event.target)) {
        cerrarMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const escribiendoBusqueda = (event) => {
    setBusqueda(event.target.value)
  }

  const filtrarDatos = (datos, filtroSeleccionado, busqueda) => {
    return datos.filter((data) => {
      if (filtroSeleccionado === 'TODAS') {
        return Object.values(data).some(
          (value) =>
            typeof value === 'string' &&
            (value.toUpperCase().includes(busqueda.toUpperCase()) ||
             data.horario.toUpperCase().includes(busqueda.toUpperCase()) ||
             data['responsable.abreviatura_cargo'].toUpperCase().includes(busqueda.toUpperCase()) ||
             data['responsable.nombres'].toUpperCase().includes(busqueda.toUpperCase()) ||
             data['responsable.apellidos'].toUpperCase().includes(busqueda.toUpperCase()) ||
             data.lugar.toUpperCase().includes(busqueda.toUpperCase()) ||
             data.periodo.toUpperCase().includes(busqueda.toUpperCase()))
        )
      } else {
        return data.categoria === filtroSeleccionado &&
            Object.values(data).some(
              (value) =>
                typeof value === 'string' &&
                (value.toUpperCase().includes(busqueda.toUpperCase()) ||
                 data.horario.toUpperCase().includes(busqueda.toUpperCase()) ||
                 data['responsable.abreviatura_cargo'].toUpperCase().includes(busqueda.toUpperCase()) ||
                 data['responsable.nombres'].toUpperCase().includes(busqueda.toUpperCase()) ||
                 data['responsable.apellidos'].toUpperCase().includes(busqueda.toUpperCase()) ||
                 data.lugar.toUpperCase().includes(busqueda.toUpperCase()) ||
                 data.periodo.toUpperCase().includes(busqueda.toUpperCase()))
            )
      }
    })
  }

  const datosFiltrados = filtrarDatos(datos, filtroSeleccionado, busqueda)

  const [estatus, setEstatus] = useState(true)

  const handleChange = async (idActividad, data) => {
    try {
      const toggleEstatus = !estatus
      setEstatus(toggleEstatus)
      data.estatus = toggleEstatus
      const response = await axios.put(`/api/actividades/${idActividad}`, data)
      console.log(response)
    } catch (error) {
    }
  }

  return (
    <>
      <div className='flex relative'>
        <label htmlFor='search-dropdown' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>Buscar</label>
        <button id='dropdown-button' data-dropdown-toggle='dropdown' className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600' type='button' onClick={toggleMenu}>{filtroSeleccionado} <svg aria-hidden='true' className='w-4 h-4 ml-1' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' /></svg></button>
        <div id='dropdown' className={`absolute z-10 ${isOpen ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 top-full left-0 mt-2`}>
          <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdown-button'>
            {filtros.map((filtro) => (
              <li key={filtro.filtrar}>
                <button type='button' className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' onClick={() => seleccionarFiltro(filtro.filtrar)}>
                  {filtro.filtrar}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='relative w-full'>
          <input
            type='search'
            id='search-dropdown'
            className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
            placeholder='Buscar...'
            required
            value={busqueda}
            onChange={escribiendoBusqueda}
          />
        </div>
      </div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              {columnas.map((columna, index) => (
                <th key={index} scope='col' className='px-6 py-3 text-center'>
                  {columna.titulo}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((data, index) => (
              <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:opacity-90 text-center'>
                <th scope='row' onClick={() => router.push(`/admin/actividad/${data.idActividad}`)} className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {data.nombre}
                </th>
                <td className='px-6 py-4 text-center'>{`${data['responsable.abreviatura_cargo']} ${data['responsable.nombres']} ${data['responsable.apellidos']}`}</td>
                <td className='px-6 py-4 text-center'>{data.horario}</td>
                <td className='px-6 py-4 text-center'>{data.lugar}</td>
                <td className='px-6 py-4 text-center'>{data.periodo}</td>
                <td className='px-6 py-4 text-center'>{data.creditos}</td>
                <td className='px-6 py-4 text-center'>{data.capacidad_maxima}</td>
                <td className='px-6 py-4 text-center'>
                  <label className='relative inline-flex items-center mr-5 cursor-pointer'>
                    <input type='checkbox' checked={data.estatus} onChange={(e) => handleChange(data.idActividad, data)} className='sr-only peer' />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600" />
                  </label>
                  <div className='flex justify-evenly'>
                    <a href='#' onClick={() => router.push(`/admin/actividad/edit/${data.idActividad}`)} className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Editar</a>
                    <a href='#' className='font-medium text-red-600 dark:text-red-500 hover:underline'>Borrar</a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

  )
}
