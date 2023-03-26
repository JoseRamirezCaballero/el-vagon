import { useState } from 'react'
import axios from 'axios'
import InputField from './InputField'
import SelectField from './SelectField'

export default function FormReponsable () {
  const [formulario, setFormulario] = useState({
    abreviatura_cargo: '',
    nombres: '',
    apellidos: '',
    genero: 'MASCULINO'
  })

  const onChange = (event) => {
    const { name, value } = event.target
    setFormulario((formulario) => ({
      ...formulario,
      [name]: value.toUpperCase()
    }))
  }

  const [arrayErrores, setArrayErrores] = useState([])
  const [mostrarPopover, setMostrarPopover] = useState(false)
  const onSubmit = async (event) => {
    event.preventDefault()
    setArrayErrores([])
    setMostrarPopover(false)
    const errores = []
    if (formulario.abreviatura_cargo.trim() === '') {
      errores.push('El campo ABREVIATURA es requerido')
    }

    if (formulario.nombres.trim() === '') {
      errores.push('El campo NOMBRE(S) es requerido')
    }

    if (formulario.apellidos.trim() === '') {
      errores.push('El campo APELLIDOS es requerido')
    }

    if (formulario.genero === '') {
      errores.push('El campo GENERO es requerido')
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
        abreviatura_cargo: formulario.abreviatura_cargo.trim(),
        nombres: formulario.nombres.trim(),
        apellidos: formulario.apellidos.trim(),
        genero: formulario.genero.trim()
      }
      const response = await axios.post('/api/responsables', formData)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='px-10 py-5 mx-auto ml-5 mr-5 rounded-3xl shadow-sm dark:bg-gray-800'>
      <form onSubmit={onSubmit} className='flex flex-wrap justify-between'>
        <div className='w-24'>
          <InputField
            id='abbreviation-input'
            label='Abreviatura'
            name='abreviatura_cargo'
            value={formulario.abreviatura_cargo}
            onChange={onChange}
          />
        </div>
        <div className='flex-grow ml-2'>
          <InputField
            id='name-input'
            label='Nombre(s)'
            name='nombres'
            value={formulario.nombres}
            onChange={onChange}
          />
        </div>
        <div className='flex-grow ml-2'>
          <InputField
            id='lastname-input'
            label='Apellidos'
            name='apellidos'
            value={formulario.apellidos}
            onChange={onChange}
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
              { label: 'MASCULINO', value: 'MASCULINO', key: 'male' },
              { label: 'FEMENINO', value: 'FEMENINO', key: 'female' }
            ]}
          />
        </div>

        <div className='flex justify-center w-full mt-2'>
          <button type='submit' className='w-full sm:w-1/3 block text-white bg-blue-700 hover:bg-blue-600 rounded-md py-2 text-sm font-medium mt-2 text-center'>
            Crear Actividad
          </button>
        </div>
        {mostrarPopover && (
          <div
            data-popover
            id='popover-click'
            role='tooltip'
            className='absolute z-10 visible inline-block w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 left-1/2 transform -translate-x-1/2 sm:mt-40 mt-64'
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
