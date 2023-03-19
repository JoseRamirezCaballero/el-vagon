import { useState, useEffect } from 'react'
import axios from 'axios'
import InputField from './InputField'
import SelectField from './SelectField'

export default function Form () {
  const [formulario, setFormulario] = useState({
    nombre: '',
    responsable: undefined,
    categoria: '',
    carrera: undefined,
    periodo: '',
    lugar: 'SIN ASIGNAR',
    horario: '',
    capacidad_maxima: '30',
    creditos: '2',
    estatus: 'Abierta'
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

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/actividades', formulario)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='px-10 py-5 mx-auto dark:bg-gray-900'>
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
            name='responsable'
            value={formulario.responsable}
            onChange={onChange}
            options={[
              ...responsables.map((responsable) => ({
                label: `${responsable.abreviatura_cargo} ${responsable.nombres} ${responsable.apellidos}`,
                value: responsable.idResponsable,
                key: responsable.idResponsable.toString()
              }))
            ]}
          />
        )}

        <div className='flex flex-wrap -mx-2 mb-6'>
          <div className='w-full lg:w-1/2 px-2'>
            <div className='flex justify-between'>
              <div className={mostrarCarreras ? 'w-1/2 pr-2' : 'w-full pr-2'}>
                <SelectField
                  id='category-input'
                  label='Categoría'
                  name='categoria'
                  value={formulario.categoria}
                  onChange={onChange}
                  options={[
                    { label: 'DEPORTIVA', value: 'DEPORTIVA' },
                    { label: 'CULTURAL', value: 'CULTURAL' },
                    { label: 'CIVICA', value: 'CIVICA' },
                    { label: 'DE CARRERA', value: 'CARRERA' }
                  ]}
                />
              </div>
              {mostrarCarreras && (
                <div className='w-1/2 pl-2'>
                  <SelectField
                    id='career-input'
                    label='Carrera'
                    name='carrera'
                    value={formulario.carrera}
                    onChange={onChange}
                    options={[
                      { label: 'ING. ELECTRÓNICA', value: 'INGENIERÍA ELECTRÓNICA' },
                      { label: 'ING. CIVIL', value: 'INGENIERÍA CIVIL' },
                      { label: 'ING. MECÁNICA', value: 'INGENIERÍA MECÁNICA' },
                      { label: 'ING. INDUSTRIAL', value: 'INGENIERÍA INDUSTRIAL' },
                      { label: 'ING. QUÍMICA', value: 'INGENIERÍA QUÍMICA' },
                      { label: 'ING. ELECTRICA', value: 'INGENIERÍA ELECTRICA' },
                      { label: 'ING. EN GESTIÓN EMPRESARIAL', value: 'INGENIERÍA EN GESTIÓN EMPRESARIAL' },
                      { label: 'ING. EN SISTEMAS COMPUTACIONALES', value: 'INGENIERÍA EN SISTEMAS COMPUTACIONALES' },
                      { label: 'LIC. EN ADMINISTRACIÓN', value: 'LICENCIATURA EN ADMINISTRACIÓN' }
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
        <button type='submit' className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Crear Actividad</button>
      </form>
    </div>
  )
}
