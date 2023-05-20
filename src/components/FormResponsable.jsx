import { useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import { ROLES } from '@/utils/constants'

export default function FormReponsable () {
  const [formulario, setFormulario] = useState({
    idRol: ROLES.RESPONSABLE,
    abreviatura_cargo: '',
    nombres: '',
    apellidos: '',
    genero: 'MASCULINO',
    numero_control: '',
    password: ''
  })

  const onChange = (event) => {
    const { name, value } = event.target
    setFormulario((formulario) => ({
      ...formulario,
      [name]: value.toUpperCase()
    }))
  }

  const notification = ({ bool, descriptionToast = '' }) => {
    bool
      ? toast.success('Responsable registrado', {
        description: descriptionToast
      })
      : toast.error('Error al registrar', {
        description: descriptionToast
      })
  }

  const [arrayErrores, setArrayErrores] = useState([])
  const [mostrarPopover, setMostrarPopover] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const onSubmit = async (event) => {
    event.preventDefault()
    setArrayErrores([])
    setMostrarPopover(false)

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2500)

    const camposRequeridos = {
      abreviatura_cargo: 'ABREVIATURA',
      nombres: 'NOMBRE(S)',
      apellidos: 'APELLIDOS',
      genero: 'GENERO'
    }

    const errores = []

    Object.entries(camposRequeridos).forEach(([campo, nombre]) => {
      if (formulario[campo].trim() === '') {
        errores.push(`El campo ${nombre} es requerido`)
      }
    })

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
      const formData = Object.fromEntries(
        Object.entries(formulario)
          .filter(([key, value]) => value !== '')
          .map(([key, value]) => {
            if (typeof value === 'string') {
              return [key, value.trim()]
            }
            return [key, value]
          })
      )
      const response = await axios.post('/api/responsables', formData)
      if (response) {
        notification({ bool: true, descriptionToast: `${response.data.abreviatura_cargo} ${response.data.nombres} ${response.data.apellidos}` })
      }
    } catch (error) {
      console.log(error)
      notification({ bool: false, descriptionToast: 'Intentelo de nuevo' })
    }
  }

  return (
    <div className='px-10 py-5 mx-auto ml-5 mr-5 rounded-3xl shadow-sm dark:bg-gray-800'>
      <form onSubmit={onSubmit} className='flex flex-wrap justify-between'>
        <div className='flex flex-wrap w-full'>
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
        </div>
        <div className='flex flex-wrap w-full'>
          <div className='flex-grow ml-2'>
            <InputField id='numero_control-input' label='Numero de control' name='numero_control' placeholde='Ej. 19161388' value={formulario.numero_control} onChange={onChange} />
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
          <div className='flex-grow ml-2'>
            <InputField id='password-input' type='password' label='Contraseña' name='password' placeholde='••••••••' value={formulario.password} onChange={onChange} />
          </div>
        </div>

        <div className='flex justify-center w-full mt-2'>
          <button type='submit' disabled={isSubmitting} className='w-full sm:w-1/3 block text-white bg-gradient-to-br from-red-500 to-orange-400 rounded-md py-2 text-sm font-medium mt-2 text-center'>
            Crear Responsable
          </button>
        </div>
        <Toaster position='bottom-right' expand richColors />
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
