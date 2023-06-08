import React, { useState } from 'react'
import InfoPopOver from '@/components/InfoPopOver'

export default function InputField ({ id, type = 'text', label, name, placeholder = '', value = '', onChange, maxLength = 10, disabled = false, ncontrol = false, free = false, popOver = null, error = false }) {
  const [isInputEmpty, setInputEmpty] = useState(false)

  const handleInputChange = (event) => {
    const inputValue = event.target.value

    if (inputValue.length <= maxLength) {
      onChange(event)
    }
  }

  const handleBlur = (event) => {
    setInputEmpty(event.target.value.trim() === '')
  }

  const inputClass = () => {
    const baseClass = 'bg-gray-50 border text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    return `${baseClass} ${isInputEmpty ? 'border-red-500' : ''} ${error ? 'border-red-500 bg-red-100' : ''}`
  }

  return (
    <div className='mb-6'>
      <label htmlFor={id} className='block mb-2 text-sm font-medium text-orange-800 dark:text-white'>
        {label}
        {popOver && (
          <InfoPopOver title={popOver.title} description={popOver.description} />
        )}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={isInputEmpty ? 'Campo obligatorio' : placeholder}
        className={inputClass()}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={(event) => {
          if (type === 'text') {
            if (!free) {
              if (!ncontrol && !isNaN(event.key) && event.key !== ' ') {
                event.preventDefault()
              }

              if (ncontrol && (event.key.match(/[^a-zA-Z0-9]/))) {
                event.preventDefault()
              }
            }
          }
          if (type === 'password' && event.key === ' ') {
            event.preventDefault()
          }
          if (type === 'number' && (event.key === '-' || isNaN(event.key)) && event.key !== 'Backspace') {
            event.preventDefault()
          }
        }}
        min={type === 'number' ? 0 : undefined}
        maxLength={maxLength}
        disabled={disabled}
      />
    </div>
  )
}
