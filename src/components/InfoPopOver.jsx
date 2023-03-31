import { useState } from 'react'

export default function InfoPopOver ({ title, description }) {
  const [mostrarPopover, setMostrarPopover] = useState(false)
  return (
    <>
      <button
        data-popover-target='popover-description' data-popover-placement='bottom-end' type='button' tabIndex='-1'
        onMouseEnter={() => setMostrarPopover(true)}
        onMouseLeave={() => setMostrarPopover(false)}
      >
        <svg className='w-4 h-4 ml-2 text-gray-400 hover:text-gray-500' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z' clipRule='evenodd' /></svg><span className='sr-only'>Info</span>
      </button>
      <div
        data-popover id='popover-description' role='tooltip'
        className={`absolute z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 ${mostrarPopover ? '' : 'invisible'}`}
      >
        <div className='p-3 space-y-2'>
          <h3 className='font-semibold text-gray-900 dark:text-white'>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </>
  )
}
