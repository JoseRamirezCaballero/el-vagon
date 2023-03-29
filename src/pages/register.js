import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import StudentCard from '@/components/StudentCard'
import ButtonDarkMode from '@/components/ButtonDarkMode'

export default function Register () {
  const [formulario, setFormulario] = useState({
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

  const [arrayErrores, setArrayErrores] = useState([])
  const [mostrarPopover, setMostrarPopover] = useState(false)
  const onSubmit = async (event) => {
    event.preventDefault()
    setArrayErrores([])
    setMostrarPopover(false)
    const errores = []
    if (formulario.nombres.trim() === '') {
      errores.push('El campo NOMBRE(S) es requerido')
    }

    if (formulario.apellidos.trim() === '') {
      errores.push('El campo APELLIDOS es requerido')
    }

    if (formulario.numero_control.trim() === '') {
      errores.push('El campo NUMERO DE CONTROL es requerido')
    }

    if (formulario.carrera === 'CARRERA') {
      errores.push('El campo CARRERA es requerido')
    }

    if (formulario.genero.trim() === '') {
      errores.push('El campo GENERO es requerido')
    }

    if (formulario.password.trim() === '') {
      errores.push('El campo CONTRASEÑA es requerido')
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
        nombres: formulario.nombres.trim(),
        apellidos: formulario.apellidos.trim(),
        numero_control: formulario.numero_control.trim(),
        genero: formulario.genero.trim(),
        correo_institucional: `${formulario.numero_control}@itoaxaca.edu.mx`,
        carrera: formulario.carrera.trim(),
        password: formulario.password.trim()
      }
      console.log(formData)
      // const response = await axios.post('/api/actividades', formData)
      // console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Head>
        <title>Registrate</title>
        <meta name='description' content='Sistema de Actividades Complementarias' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='dark:bg-gray-700 bg-gray-200'>
        <div className='flex flex-wrap items-center justify-evenly px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
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
                <button type='submit' className='w-full block text-white bg-blue-700 hover:bg-blue-600 rounded-md py-2 text-sm font-medium mt-2 text-center'>
                  Registrarse
                </button>
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
