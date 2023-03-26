import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ButtonDarkMode ({ width = 16, height = 16 }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedIsDarkMode = localStorage.getItem('isDarkMode')
    if (savedIsDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedIsDarkMode))
    } else {
      setIsDarkMode(false)
    }
  }, [])

  const changeTheme = () => {
    const newIsDarkMode = !isDarkMode
    setIsDarkMode(newIsDarkMode)
    localStorage.setItem('isDarkMode', JSON.stringify(newIsDarkMode))
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <>
      <button className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full text-sm p-2.5 inline-flex items-center justify-center shadow-md border-gray-200 border-[1px] dark:border-[1px] dark:border-gray-700' onClick={changeTheme}>
        {isDarkMode ? <Image src='/sun.svg' alt='sun' width={width} height={height} className='dark:invert dark:brightness-200 dark:contrast-200' /> : <Image src='/moon.svg' alt='moon' width={width} height={height} />}
      </button>
    </>
  )
}
