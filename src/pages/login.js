import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
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
    setFormulario((formulario) => ({
      ...formulario,
      [name]: value.toUpperCase()
    }))
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
              <form className='space-y-4 md:space-y-6' action='#'>
                <div>
                  <InputField id='numero_control-input' label='Numero de control' name='numero_control' placeholde='Ej. 19161388' value={formulario.numero_control} onChange={onChange} />
                </div>
                <div>
                  <label for='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Contraseña <InfoPopOver title='¿Olvidaste tu contraseña?' description='Comunicate con el Departamento de Formacion Integral' /></label>
                  <input type='password' id='password' value={formulario.password} onChange={onChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                </div>
                <button type='submit' className='w-full block text-white bg-blue-700 hover:bg-blue-600 rounded-md py-2 text-sm font-medium mt-2 text-center'>
                  Iniciar sesión
                </button>
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
