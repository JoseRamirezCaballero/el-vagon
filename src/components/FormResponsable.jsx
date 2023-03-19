import { useState } from 'react'
import axios from 'axios'
import InputField from './InputField'
import SelectField from './SelectField'

export default function FormReponsable () {
  const [formulario, setFormulario] = useState({
    abreviatura_cargo: '',
    nombres: '',
    apellidos: '',
    genero: ''
  })

  const onChange = (event) => {
    const { name, value } = event.target
    setFormulario((formulario) => ({
      ...formulario,
      [name]: value.toUpperCase()
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/responsables', formulario)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='px-10 py-5 mx-auto dark:bg-gray-900'>
      <form onSubmit={onSubmit} className='flex flex-wrap justify-between'>
        <div className='w-24'>
          <InputField
            id='abbreviation-input'
            label='Abreviatura'
            name='abreviatura_cargo'
            value={formulario.abreviatura_cargo}
            onChange={onChange}
            className='w-full'
          />
        </div>
        <div className='flex-grow ml-2'>
          <InputField
            id='name-input'
            label='Nombre(s)'
            name='nombres'
            value={formulario.nombres}
            onChange={onChange}
            className='w-full'
          />
        </div>
        <div className='flex-grow ml-2'>
          <InputField
            id='lastname-input'
            label='Apellidos'
            name='apellidos'
            value={formulario.apellidos}
            onChange={onChange}
            className='w-full'
          />
        </div>
        <div className='flex-grow ml-2'>
          <SelectField
            id='gender-input'
            label='Género'
            name='genero'
            value={formulario.genero}
            onChange={onChange}
            options={[
              { label: 'MASCULINO', value: 'MASCULINO' },
              { label: 'FEMENINO', value: 'FEMENINO' }
            ]}
            className='w-full'
          />
        </div>
        <button type='submit' className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex-grow mt-2'>
          Crear Responsable
        </button>
      </form>
    </div>
  )
}
