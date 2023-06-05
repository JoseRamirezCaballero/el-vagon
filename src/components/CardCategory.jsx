import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function CardCategory ({ title, description, href = '#' }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Link
      href={href} className={`flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transform hover:translate-y-[-5px] transition-all duration-300 ${
      isHovered ? '' : 'filter grayscale hover:grayscale-0'
    }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src='/img/act_deportiva.jpg'
        alt=''
        width={500}
        height={500}
        className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg cursor-pointer'
      />
      <div className='flex flex-col justify-between p-4 leading-normal'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{title}</h5>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{description}</p>
      </div>
    </Link>
  )
}
