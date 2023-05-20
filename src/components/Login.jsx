import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import ButtonDarkMode from '@/components/ButtonDarkMode'
import InfoPopOver from '@/components/InfoPopOver'
import InputField from '@/components/InputField'
import Image from 'next/image'
import { ROLES } from '@/utils/constants'

export default function Login () {
  const router = useRouter()
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
  const [loading, setLoading] = useState(false)
  const onSubmit = async (event) => {
    event.preventDefault()
    setArrayErrores([])
    setMostrarPopover(false)
    setLoading(true)

    const credentials = {
      ...formulario,
      numero_control: formulario.numero_control.trim(),
      password: formulario.password.trim()
    }

    if (!credentials.numero_control || !credentials.password) {
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
      const auth = await axios.post('/api/auth/login', credentials)
      if (auth) {
        const user = await axios.get('/api/profile')
        if (user.data.idRol === ROLES.ESTUDIANTE) {
          router.push('/estudiante')
        } else if (user.data.idRol === ROLES.ADMINISTRADOR) {
          router.push('/admin')
        } else if (user.data.idRol === ROLES.RESPONSABLE) {
          router.push('/responsable')
        }
      }
      return
    } catch (error) {
      setArrayErrores([
        'El número de control o la contraseña son incorrectos'
      ])
      setMostrarPopover(true)
      setLoading(false)
      setTimeout(() => {
        setMostrarPopover(false)
      }, 3000)
    }
  }
  return (
    <section className='bg-gray-300 dark:bg-gray-700'>
      <div className='flex flex-wrap items-center justify-evenly px-6 py-8 mx-auto md:h-screen lg:py-0 '>

        <div class='flex-1 max-w-xl mx-auto'>

          <div class="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700'">
            <ul class='flex flex-row-reverse '>
              <li class='p-6 flex-1 space-y-2'>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Image width={600} height={600} className='w-50 h-50 justify-center' src='/img/extrapp.png' alt='Logo ITO' priority />
                <br />
                <br />
                <ButtonDarkMode width={24} height={24} />

              </li>
              <li className='p-6 space-y-4 md:space-y-6 sm:p-8 '>
                <div className='flex flex-col items-center'>
                  <Image width={600} height={60} className='w-20 h-20 justify-center' src='https://upload.wikimedia.org/wikipedia/commons/8/85/Instituto_Tecnologico_de_Oaxaca_-_original.svg' alt='Logo ITO' priority />
                </div>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-orange-700 md:text-2xl dark:text-white'>
                  Iniciar sesión en su cuenta
                </h1>
                <form onSubmit={onSubmit} className='space-y-4 md:space-y-6'>
                  <div>
                    <InputField id='numero_control-input' label='Número de control' name='numero_control' placeholde='Ej. 19161388' value={formulario.numero_control} onChange={onChange} />
                  </div>
                  <div>
                    <label htmlFor='password' className='block mb-2 text-sm font-medium text-orange-800 dark:text-white'>Contraseña <InfoPopOver title='¿Olvidaste tu contraseña?' description='Comunicate con el Departamento de Formacion Integral' /></label>
                    <input type='password' id='password-input' name='password' value={formulario.password} onChange={onChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                  </div>
                  {loading
                    ? (
                      <button disabled type='button' className='w-full text-white bg-gradient-to-br from-red-500 to-orange-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center justify-center'>
                        <svg aria-hidden='true' role='status' className='inline w-4 h-4 mr-3 text-white animate-spin' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='#E5E7EB' />
                          <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentColor' />
                        </svg>
                        Procesando...
                      </button>)
                    : (

                      <button type='submit' class='w-full text-white bg-gradient-to-br from-red-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2'>
                        Iniciar sesión
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
                    ¿Aún no tienes una cuenta? <Link href='/register' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Registrate</Link>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </section>
  )
}
