import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import { ROLES, axiosAPI } from '@/utils/constants'

export default function FormReponsable () {
  const [formulario, setFormulario] = useState({
    idRol: ROLES.RESPONSABLE,
    abreviatura_cargo: '',
    nombres: '',
    apellidos: '',
    genero: 'HOMBRE',
    numero_control: '',
    password: ''
  })

  const formularioIncial = {
    idRol: ROLES.RESPONSABLE,
    abreviatura_cargo: '',
    nombres: '',
    apellidos: '',
    genero: 'HOMBRE',
    numero_control: '',
    password: ''
  }

  const [numerosTarjeta, setNumerosTarjeta] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAPI.get('/responsables/')
        const arrayNumeros = response.data.map((elemento) => elemento.numero_control)
        setNumerosTarjeta(arrayNumeros)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const [confirmPassword, setConfirmPassword] = useState('')
  const [borderRed, setBorderRed] = useState(false)
  const onChange = (event) => {
    const { name, value } = event.target

    if (name === 'numero_control') {
      if (numerosTarjeta.includes(value)) {
        notification({ bool: false, descriptionToast: 'El número de tarjeta ingresado ya existe.' })
        setBorderRed(true)
      }
    }

    if (name === 'confirmPassword') {
      setConfirmPassword(value)
    }

    if (name === 'password') {
      setFormulario((formulario) => ({
        ...formulario,
        [name]: value
      }))
    } else {
      setFormulario((formulario) => ({
        ...formulario,
        [name]: value.toUpperCase()
      }))
    }
  }

  const notification = ({ bool, descriptionToast = '' }) => {
    bool
      ? toast.success('Responsable registrado', {
        description: descriptionToast
      })
      : toast.error('Error de registro', {
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
      genero: 'GENERO',
      password: 'CONTRASEÑA'
    }

    const errores = []

    Object.entries(camposRequeridos).forEach(([campo, nombre]) => {
      if (campo === 'password') {
        if (formulario[campo].trim() === '') {
          errores.push(`El campo ${nombre} es requerido`)
        } else {
          const password = formulario.password
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_?/:'";~`+]).{8,15}$/

          if (!regex.test(password)) {
            if (password.length < 8 || password.length > 15) {
              errores.push(`La ${nombre} debe tener entre 8 y 15 caracteres.`)
            }
            if (!/(?=.*[a-z])/.test(password)) {
              errores.push(`La ${nombre} debe contener al menos una minúscula.`)
            }
            if (!/(?=.*[A-Z])/.test(password)) {
              errores.push(`La ${nombre} debe contener al menos una mayúscula.`)
            }
            if (!/(?=.*\d)/.test(password)) {
              errores.push(`La ${nombre} debe contener al menos un número.`)
            }
            if (!/(?=.*[!@#$%^&*()\-_?/:'";~`+])/.test(password)) {
              errores.push(`La ${nombre} debe contener al menos un carácter especial.`)
            }
          }
        }
      } else {
        if (formulario[campo].trim() === '') {
          errores.push(`El campo ${nombre} es requerido`)
        }
      }
    })

    if (formulario.password !== confirmPassword) {
      errores.push('Las contraseñas no coinciden')
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
      const response = await axiosAPI.post('/responsables', formData)
      if (response) {
        notification({ bool: true, descriptionToast: `${response.data.abreviatura_cargo} ${response.data.nombres} ${response.data.apellidos}` })
        setFormulario(formularioIncial)
        setConfirmPassword('')
      }
    } catch (error) {
      notification({ bool: false, descriptionToast: 'Número de tarjeta duplicado' })
    }
  }

  return (
    <div className='px-10 py-5 mx-auto ml-5 mr-5 rounded-3xl shadow-sm dark:bg-gray-800'>
      <form onSubmit={onSubmit} className='flex flex-wrap justify-between'>
        <div className='flex flex-wrap w-full'>
          <div className='w-24'>
            <SelectField
              id='abbreviation-input'
              label='Abreviatura'
              name='abreviatura_cargo'
              value={formulario.abreviatura_cargo}
              onChange={onChange}
              options={[
                { key: 'campo_vacio', label: '', value: '' },
                { key: 'c.', label: 'C.', value: 'C.' },
                { key: 'lic.', label: 'LIC.', value: 'LIC.' },
                { key: 'm.t.i.', label: 'M.T.I.', value: 'M.T.I.' },
                { key: 'prof.ef.', label: 'PROF. E.F.', value: 'PROF. E.F.' },
                { key: 'dr.', label: 'DR.', value: 'DR.' },
                { key: 'ing.', label: 'ING.', value: 'ING.' },
                { key: 'arq.', label: 'ARQ.', value: 'ARQ.' },
                { key: 'prof.', label: 'PROF.', value: 'PROF.' },
                { key: 'psic.', label: 'PSIC.', value: 'PSIC.' },
                { key: 'adm.', label: 'ADM.', value: 'ADM.' }
              ]}
            />
          </div>
          <div className='flex-grow ml-2'>
            <InputField
              id='name-input'
              label='Nombre(s)'
              name='nombres'
              value={formulario.nombres}
              onChange={onChange}
              maxLength={25}
            />
          </div>
          <div className='flex-grow ml-2'>
            <InputField
              id='lastname-input'
              label='Apellidos'
              name='apellidos'
              value={formulario.apellidos}
              onChange={onChange}
              maxLength={25}
            />
          </div>
        </div>
        <div className='flex flex-wrap w-full'>
          <div className='flex-grow'>
            <InputField
              id='numero_control-input'
              maxLength={4}
              label='Número de tarjeta'
              name='numero_control'
              placeholder='Ej. 0283'
              value={formulario.numero_control}
              onChange={onChange}
              type='number'
              popOver={{ title: 'Numero de tarjeta del trabajador', description: 'Este número es exclusivo para trabajadores y permitirá acceder a la cuenta' }}
              error={borderRed}
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
                { label: 'HOMBRE', value: 'HOMBRE', key: 'male' },
                { label: 'MUJER', value: 'MUJER', key: 'female' }
              ]}
            />
          </div>
          <div className='flex-grow ml-2'>
            <InputField id='password-input' maxLength={50} type='password' label='Contraseña' name='password' placeholder='••••••••' value={formulario.password} onChange={onChange} popOver={{ title: 'Requisitos de contraseña', description: 'La contraseña debe tener entre 8 y 15 caracteres y contener al menos un carácter especial, un número, una mayúscula y una minúscula.' }} />
          </div>
          <div className='flex-grow ml-2'>
            <InputField id='confirm-password-input' type='password' maxLength={50} label='Confirmar contraseña' name='confirmPassword' placeholder='••••••••' value={confirmPassword} onChange={onChange} />
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
