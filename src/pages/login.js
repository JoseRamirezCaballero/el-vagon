import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import ButtonDarkMode from '@/components/ButtonDarkMode'
import InfoPopOver from '@/components/InfoPopOver'
import InputField from '@/components/InputField'

export default function Login () {
  const [formulario, setFormulario] = useState({
    numero_control: '',
    password: ''
  })

  const onChange = (event) => {
    const { name, value } = event.target
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

  const [arrayErrores, setArrayErrores] = useState([])
  const [mostrarPopover, setMostrarPopover] = useState(false)
  const onSubmit = async (event) => {
    event.preventDefault()
    setArrayErrores([])
    setMostrarPopover(false)

    const formData = {
      ...formulario,
      numero_control: formulario.numero_control.trim(),
      password: formulario.password.trim()
    }

    if (!formData.numero_control || !formData.password) {
      setArrayErrores([
        'Rellena TODOS los campos'
      ])
      setMostrarPopover(true)
      setTimeout(() => {
        setMostrarPopover(false)
      }, 3000)
      return
    }

    try {
      const response = await axios.get('/api/estudiantes', formData)

      const usuarioEncontrado = response.data.find(
        (usuario) =>
          usuario.numero_control === formData.numero_control &&
          usuario.password === formData.password
      )

      if (usuarioEncontrado) {
        console.log('Inicio de sesión exitoso')
      } else {
        setArrayErrores([
          'El número de control o la contraseña son incorrectos'
        ])
        setMostrarPopover(true)
        setTimeout(() => {
          setMostrarPopover(false)
        }, 3000)
        return
      }
    } catch (error) {
      alert('Ha ocurrido un error en la autenticación. Intente de nuevo más tarde')
    }
  }

  return (
    <>
      <Head>
        <title>Inicia Sesión</title>
        <meta name='description' content='Sistema de Actividades Complementarias' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='bg-gray-200 dark:bg-gray-700'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Iniciar sesión en su cuenta
              </h1>
              <form onSubmit={onSubmit} className='space-y-4 md:space-y-6'>
                <div>
                  <InputField id='numero_control-input' label='Numero de control' name='numero_control' placeholde='Ej. 19161388' value={formulario.numero_control} onChange={onChange} />
                </div>
                <div>
                  <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Contraseña <InfoPopOver title='¿Olvidaste tu contraseña?' description='Comunicate con el Departamento de Formacion Integral' /></label>
                  <input type='password' id='password-input' name='password' value={formulario.password} onChange={onChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                </div>
                <button type='submit' className='w-full block text-white bg-blue-700 hover:bg-blue-600 rounded-md py-2 text-sm font-medium mt-2 text-center'>
                  Iniciar sesión
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
                  ¿Aún no tienes una cuenta? <Link href='/register' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Registrate</Link>
                </p>
                <ButtonDarkMode width={24} height={24} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
