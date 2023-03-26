import { useState, useEffect } from 'react'
import axios from 'axios'
import InputField from './InputField'
import SelectField from './SelectField'

export default function Form () {
  const [formulario, setFormulario] = useState({
    nombre: '',
    idResponsable: '',
    categoria: 'DEPORTIVA',
    carrera: undefined,
    periodo: '',
    lugar: 'SIN ASIGNAR',
    horario: '',
    capacidad_maxima: '30',
    creditos: '2',
    estatus: true
  })

  const [mostrarCarreras, setMostrarCarreras] = useState(false)
  const onChange = (event) => {
    const { name, value } = event.target
    setFormulario((formulario) => ({
      ...formulario,
      [name]: value.toUpperCase()
    }))
  }

  useEffect(() => {
    if (formulario.categoria === 'CARRERA') {
      setMostrarCarreras(true)
    } else {
      formulario.carrera = undefined
      setMostrarCarreras(false)
    }
  }, [formulario])

  const [responsables, setResponsables] = useState([])
  useEffect(() => {
    const fetchResponsables = async () => {
      const response = await axios.get('/api/responsables')
      setResponsables(response.data)
    }
    fetchResponsables()
  }, [])

  const [arrayErrores, setArrayErrores] = useState([])
  const [mostrarPopover, setMostrarPopover] = useState(false)
  const onSubmit = async (event) => {
    event.preventDefault()
    setArrayErrores([])
    setMostrarPopover(false)
    const errores = []
    if (formulario.nombre.trim() === '') {
      errores.push('El campo NOMBRE es requerido')
    }

    if (formulario.idResponsable.trim() === '') {
      errores.push('El campo REPONSABLE es requerido')
    }

    if (formulario.categoria.trim() === '') {
      errores.push('El campo CATEGORIA es requerido')
    }

    if (formulario.categoria === 'CARRERA' && (!formulario.carrera || formulario.carrera.trim() === '')) {
      errores.push('El campo CARRERA es requerido para la categoría DE CARRERA')
    }

    if (formulario.periodo.trim() === '') {
      errores.push('El campo PERIODO es requerido')
    }

    if (formulario.lugar.trim() === '') {
      errores.push('El campo LUGAR es requerido')
    }

    if (formulario.horario.trim() === '') {
      errores.push('El campo HORARIO es requerido')
    }

    if (formulario.capacidad_maxima.trim() === '') {
      errores.push('El campo CAPACIDAD MAXIMA es requerido')
    }

    if (formulario.creditos.trim() === '') {
      errores.push('El campo CREDITOS es requerido')
    }

    if (errores.length > 0) {
      setArrayErrores(errores)
      setMostrarPopover(true)
      setTimeout(() => {
        setMostrarPopover(false)
      }, 3000)
      return
    } else {
      setMostrarPopover(false)
    }

    try {
      const formData = {
        ...formulario,
        nombre: formulario.nombre.trim(),
        idResponsable: formulario.idResponsable.trim(),
        categoria: formulario.categoria.trim(),
        carrera: formulario.carrera?.trim(),
        periodo: formulario.periodo.trim(),
        lugar: formulario.lugar.trim(),
        horario: formulario.horario.trim(),
        capacidad_maxima: formulario.capacidad_maxima.trim(),
        creditos: formulario.creditos.trim(),
        estatus: formulario.estatus
      }
      const response = await axios.post('/api/actividades', formData)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='px-10 py-5 mx-auto ml-5 mr-5 rounded-3xl shadow-sm dark:bg-gray-800'>
      <form onSubmit={onSubmit}>
        <InputField
          id='name-input'
          label='Nombre de la Actividad'
          name='nombre'
          value={formulario.nombre}
          onChange={onChange}
        />

        {!responsables && <p>Cargando responsables...</p>}
        {!!responsables && (
          <SelectField
            id='responsible-input'
            label='Responsable'
            name='idResponsable'
            value={formulario.idResponsable}
            onChange={onChange}
            options={[
              { label: 'SIN ASIGNAR', value: '', key: 'sin_asignar' },
              ...responsables.map((responsable) => ({
                label: `${responsable.abreviatura_cargo} ${responsable.nombres} ${responsable.apellidos}`,
                value: responsable.idResponsable,
                key: `${responsable.idResponsable}_${responsable.nombres}`
              }))
            ]}

          />
        )}

        <div className='flex flex-wrap -mx-2 mb-6'>
          <div className='w-full lg:w-1/2 px-2'>
            <div className='flex justify-between'>
              <div className={mostrarCarreras ? 'w-1/3 pr-2' : 'w-full pr-2'}>
                <SelectField
                  id='category-input'
                  label='Categoría'
                  name='categoria'
                  value={formulario.categoria}
                  onChange={onChange}
                  options={[
                    { key: 'deportiva', label: 'DEPORTIVA', value: 'DEPORTIVA' },
                    { key: 'cultural', label: 'CULTURAL', value: 'CULTURAL' },
                    { key: 'civica', label: 'CIVICA', value: 'CIVICA' },
                    { key: 'de_carrera', label: 'DE CARRERA', value: 'CARRERA' }
                  ]}
                />

              </div>
              {mostrarCarreras && (
                <div className='w-2/3 pl-2'>
                  <SelectField
                    id='career-input'
                    label='Carrera'
                    name='carrera'
                    value={formulario.carrera}
                    onChange={onChange}
                    options={[
                      { key: 'campo_vacio', label: '', value: '' },
                      { key: 'ingenieria_civil', label: 'ING. CIVIL', value: 'INGENIERÍA CIVIL' },
                      { key: 'ingenieria_electrica', label: 'ING. ELÉCTRICA', value: 'INGENIERÍA ELÉCTRICA' },
                      { key: 'ingenieria_electronica', label: 'ING. ELECTRÓNICA', value: 'INGENIERÍA ELECTRÓNICA' },
                      { key: 'ingenieria_gestion_empresarial', label: 'ING. EN GESTIÓN EMPRESARIAL', value: 'INGENIERÍA EN GESTIÓN EMPRESARIAL' },
                      { key: 'ingenieria_sistemas_computacionales', label: 'ING. EN SISTEMAS COMPUTACIONALES', value: 'INGENIERÍA EN SISTEMAS COMPUTACIONALES' },
                      { key: 'ingenieria_industrial', label: 'ING. INDUSTRIAL', value: 'INGENIERÍA INDUSTRIAL' },
                      { key: 'ingenieria_mecanica', label: 'ING. MECÁNICA', value: 'INGENIERÍA MECÁNICA' },
                      { key: 'ingenieria_quimica', label: 'ING. QUÍMICA', value: 'INGENIERÍA QUÍMICA' },
                      { key: 'licenciatura_administracion', label: 'LIC. EN ADMINISTRACIÓN', value: 'LICENCIATURA EN ADMINISTRACIÓN' }
                    ]}
                  />

                </div>
              )}
            </div>
            <InputField
              id='place-input'
              label='Lugar'
              name='lugar'
              value={formulario.lugar}
              onChange={onChange}
            />
            <InputField
              id='capacity-input'
              type='number'
              label='Capacidad máxima'
              name='capacidad_maxima'
              value={formulario.capacidad_maxima}
              onChange={onChange}
            />
          </div>
          <div className='w-full lg:w-1/2 px-2'>
            <InputField
              id='period-input'
              label='Periodo'
              name='periodo'
              placeholder='Ej. NOVIEMBRE/2022 - ENERO/2023'
              value={formulario.periodo}
              onChange={onChange}
            />
            <InputField
              id='hour-input'
              label='Horario'
              name='horario'
              placeholder='Ej. 12:00 - 13:00'
              value={formulario.horario}
              onChange={onChange}
            />
            <InputField
              id='credits-input'
              label='Numero de creditos'
              name='creditos'
              type='number'
              value={formulario.creditos}
              onChange={onChange}
            />
          </div>
        </div>

        <div className='flex justify-center'>
          <button type='submit' className='w-full sm:w-1/3 block text-white bg-blue-700 hover:bg-blue-600 rounded-md py-2 text-sm font-medium mt-2 text-center'>
            Crear Actividad
          </button>
        </div>
        {mostrarPopover && (
          <div
            data-popover
            id='popover-click'
            role='tooltip'
            className='absolute z-10 visible inline-block w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 left-1/2 transform -translate-x-1/2 mt-2'
          >
            <div className='px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700'>
              <h3 className='font-semibold text-gray-900 dark:text-white'>Ups! Ha ocurrido un error</h3>
            </div>
            <div className='px-3 py-2'>
              <ul>
                {arrayErrores.map((campo) => (
                  <li key={campo}>{campo}</li>
                ))}
              </ul>
            </div>
            <div data-popper-arrow />
          </div>
        )}

      </form>
    </div>
  )
}
