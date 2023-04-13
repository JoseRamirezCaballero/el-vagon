import { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Link from 'next/link'

export default function Carousel () {
  const [index, setIndex] = useState(0)
  const images = [
    '/img/estadio1.jpg',
    '/img/estadio2.jpg',
    '/img/estadio3.jpg',
    '/img/estadio4.jpg',
    '/img/estadio5.jpg',
    '/img/estadio6.jpg',
    '/img/estadio7.jpg',
    '/img/estadio7.jpg',
    '/img/estadio9.jpg',
    '/img/estadio10.jpg',
    '/img/estadio11.jpg',
    '/img/estadio12.jpg',
    '/img/estadio13.jpg'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % images.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section
      style={{
        backgroundImage: `url('${images[index]}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: '#7f7f7f',
        backgroundBlendMode: 'multiply'
      }}
    >

      <div className='px-4 mx-auto max-w-screen-xl h-screen text-center py-24 lg:py-56'>
        <h2 className='mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl'>Actividades Extracolares</h2>
        <TypeAnimation
          sequence={[
            'En el Instituto Tecnológico de Oaxaca, estamos comprometidos con tu éxito académico y personal.',
            1000,
            'Es por eso que ofrecemos una amplia variedad de actividades extraescolares.',
            1000,
            'Tenemos actividades deportivas, culturales y civicas.',
            1000,
            'Nuestro objetivo es ayudarte a desarrollar tus habilidades.',
            1000,
            'Nuestro objetivo es ayudarte a promover tu creatividad.',
            1000,
            'Nuestro objetivo es mejorar tu bienestar en general.',
            1000,
            'Forma parte de nuestra comunidad tecnológica y aprovecha al máximo tu experiencia universitaria.',
            1000
          ]}
          wrapper='p'
          cursor
          speed={60}
          deletionSpeed={90}
          repeat={Infinity}
          className='mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48'
        />
        <div className='flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4'>
          <Link href='/login' className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'>
            Iniciar sesión
            <svg aria-hidden='true' className='ml-2 -mr-1 w-4 h-4' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clipRule='evenodd' /></svg>
          </Link>
          <Link href='/register' className='inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400'>
            Registrate
          </Link>
        </div>
      </div>
    </section>
  )
}
