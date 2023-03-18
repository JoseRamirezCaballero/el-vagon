import { useState } from 'react'
import axios from 'axios'
import InputField from './InputField'
import SelectField from './SelectField'

export default function Form () {
  const [formulario, setFormulario] = useState({
    nombre: '',
    responsable: '',
    categoria: '',
    periodo: '',
    lugar: 'SIN ASIGNAR',
    horario: '',
    capacidad_maxima: '30',
    creditos: '2',
    estatus: 'Abierta'
  })

  const onChange = (event) => {
    const { name, value } = event.target
    setFormulario((formulario) => ({
      ...formulario,
      [name]: value
    }))
  }

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
    <form onSubmit={onSubmit}>
      <InputField
        id='name-input'
        label='Nombre de la Actividad'
        name='nombre'
        value={formulario.nombre}
        onChange={onChange}
      />

      <InputField
        id='responsible-input'
        label='Responsable'
        name='responsable'
        value={formulario.responsable}
        onChange={onChange}
      />

      <div className='flex flex-wrap -mx-2 mb-6'>
        <div className='w-full lg:w-1/2 px-2'>
          <SelectField
            id='category-input'
            label='Categoría'
            name='categoria'
            value={formulario.categoria}
            onChange={onChange}
            options={[
              { label: 'Deportiva', value: 'Deportiva' },
              { label: 'Cultural', value: 'Cultural' },
              { label: 'Cívica', value: 'Cívica' }
            ]}
            className='mb-4'
          />
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
            placeholder='Ej. Noviembre/2022 - Enero/2023'
            value={formulario.periodo}
            onChange={onChange}
            className='mb-4'
          />
          <InputField
            id='hour-input'
            label='Horario'
            name='horario'
            placeholder='12:00 - 13:00'
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

      {/* <SelectField
        id='state-input'
        label='estatus'
        name='estatus'
        value={formulario.estatus}
        onChange={onChange}
        options={[
          { label: 'Activo', value: 'Activo' },
          { label: 'Inactivo', value: 'Inactivo' }
        ]}
      /> */}
      <button type='submit' className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Crear Actividad</button>
    </form>

  )
}
