import { useState } from 'react'
import Image from 'next/image'

export default function ButtonDarkMode () {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const changeTheme = () => {
    setIsDarkMode(change => !change)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <>
      <button className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full text-sm p-2.5 inline-flex items-center justify-center shadow-md' onClick={changeTheme}>
        {isDarkMode ? <Image src='/sun.svg' alt='sun' width={16} height={16} className='dark:invert dark:brightness-200 dark:contrast-200' /> : <Image src='/moon.svg' alt='moon' width={16} height={16} />}
      </button>

    </>
  )
}
