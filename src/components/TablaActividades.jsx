export default function TablaActividades ({ columnas, datos }) {
  return (
    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          {columnas.map((columna, index) => (
            <th key={index} scope='col' className='px-6 py-3'>
              {columna.titulo}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datos.map((data, index) => (
          <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
              {data.nombre}
            </th>
            <td className='px-6 py-4'>{`${data['responsable.abreviatura_cargo']} ${data['responsable.nombres']} ${data['responsable.apellidos']}`}</td>
            <td className='px-6 py-4'>{data.horario}</td>
            <td className='px-6 py-4'>{data.lugar}</td>
            <td className='px-6 py-4'>{data.periodo}</td>
            <td className='px-6 py-4'>{data.creditos}</td>
            <td className='px-6 py-4'>{data.capacidad_maxima}</td>
            <td className='px-6 py-4'>En proceso</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
