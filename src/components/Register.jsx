import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import StudentCard from '@/components/StudentCard'
import ButtonDarkMode from '@/components/ButtonDarkMode'

export default function Register () {
  const router = useRouter()
  const [formulario, setFormulario] = useState({
    idRol: 1,
    nombres: '',
    apellidos: '',
    numero_control: '',
    genero: 'MASCULINO',
    correo_institucional: '',
    carrera: 'INGENIERÍA CIVIL',
    password: ''
  })

  const onChange = (event) => {
    const { name, value } = event.target
    if (name === 'correo_institucional' || name === 'password') {
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

  const isInvalidField = (value, defaultValue) => {
    return value.trim() === '' || value === defaultValue
  }

  const [arrayErrores, setArrayErrores] = useState([])
  const [mostrarPopover, setMostrarPopover] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSubmit = async (event) => {
    event.preventDefault()
    setArrayErrores([])
    setMostrarPopover(false)
    setLoading(true)
    const errores = []

    if (isInvalidField(formulario.nombres, 'NOMBRE(S)')) {
      errores.push('El campo NOMBRE(S) es requerido')
    }

    if (isInvalidField(formulario.apellidos, 'APELLIDOS')) {
      errores.push('El campo APELLIDOS es requerido')
    }

    if (isInvalidField(formulario.numero_control, 'NUMERO DE CONTROL')) {
      errores.push('El campo NUMERO DE CONTROL es requerido')
    }

    if (isInvalidField(formulario.carrera, 'CARRERA')) {
      errores.push('El campo CARRERA es requerido')
    }

    if (isInvalidField(formulario.genero, '')) {
      errores.push('El campo GENERO es requerido')
    }

    if (isInvalidField(formulario.password, '')) {
      errores.push('El campo CONTRASEÑA es requerido')
    }

    if (errores.length > 0) {
      setArrayErrores(errores)
      setMostrarPopover(true)
      setTimeout(() => {
        setMostrarPopover(false)
        setLoading(false)
      }, 3000)
      return
    } else {
      setMostrarPopover(false)
    }

    try {
      await axios.get('/api/conn')
      const formData = { ...formulario };
      ['nombres', 'apellidos', 'numero_control', 'genero', 'carrera', 'password'].forEach(campo => {
        formData[campo] = formData[campo].trim()
      })
      formData.correo_institucional = `${formData.numero_control}@itoaxaca.edu.mx`
      console.log('registrado: ', formData)
      await axios.post('/api/estudiantes', formData)
      router.push('/login')
    } catch (error) {
      setLoading(false)
      alert('Internal Server Error (500). \nSi el problema persiste, comunícate con el Departamento de Formación Integral.')
    }
  }

  return (
    <>
      <main className='dark:bg-gray-700 bg-gray-200'>
        <div className='flex flex-wrap items-center justify-evenly px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white'>
                Registra tu cuenta
              </h1>
              <form onSubmit={onSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <InputField id='name-input' type='nombres' label='Nombre(s)' name='nombres' placeholde='Jose Manuel' value={formulario.nombres} onChange={onChange} />
                  </div>
                  <div>
                    <InputField id='lastname-input' type='apellidos' label='Apellidos' name='apellidos' placeholde='Ramirez Caballero' value={formulario.apellidos} onChange={onChange} />
                  </div>
                  <div>
                    <InputField id='numero_control-input' label='Numero de control' name='numero_control' placeholde='Ej. 19161388' value={formulario.numero_control} onChange={onChange} />
                  </div>
                  <div>
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
                </div>
                <div>
                  <SelectField
                    id='career-input'
                    label='Carrera'
                    name='carrera'
                    value={formulario.carrera}
                    onChange={onChange}
                    options={[
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
                <div>
                  <InputField id='password-input' type='password' label='Contraseña' name='password' placeholde='••••••••' value={formulario.password} onChange={onChange} />
                </div>
                {loading
                  ? (
                    <button disabled type='button' className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center justify-center'>
                      <svg aria-hidden='true' role='status' className='inline w-4 h-4 mr-3 text-white animate-spin' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='#E5E7EB' />
                        <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentColor' />
                      </svg>
                      Procesando...
                    </button>)
                  : (
                    <button type='submit' className='w-full block text-white bg-blue-800 hover:bg-blue-600 rounded-md py-2 text-sm font-medium mt-2 text-center'>
                      Registrarse
                    </button>
                    )}
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
              <div className='flex items-center justify-between'>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  ¿Ya tienes una cuenta? <Link href='/login' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Inicia Sesión</Link>
                </p>
                <ButtonDarkMode width={24} height={24} />
              </div>
            </div>
          </div>
          <StudentCard nombres={formulario.nombres} apellidos={formulario.apellidos} numerocontrol={formulario.numero_control} carrera={formulario.carrera} />
        </div>
      </main>
    </>
  )
}
