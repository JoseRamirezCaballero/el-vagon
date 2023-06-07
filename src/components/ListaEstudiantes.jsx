import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'

export default function ListaEstudiantes ({ estudiantes }) {
  const styles = StyleSheet.create({
    body: {
      padding: 10
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 20
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      borderBottomStyle: 'solid',
      borderRightWidth: 1,
      borderRightColor: '#000',
      borderRightStyle: 'solid',
      borderLeftWidth: 1,
      borderLeftColor: '#000',
      borderLeftStyle: 'solid',
      alignItems: 'stretch'
    },
    nameCell: {
      width: '40%',
      padding: 5,
      fontSize: 10,
      borderRightWidth: 1,
      borderRightColor: '#000',
      borderRightStyle: 'solid'
    },
    cell: {
      width: '5%',
      padding: 5,
      fontSize: 10,
      borderRightWidth: 1,
      borderRightColor: '#000',
      borderRightStyle: 'solid'
    },
    emptyCell: {
      flexGrow: 1,
      padding: 5,
      fontSize: 10,
      textAlign: 'center',
      color: '#bbb'
    }
  })

  const ListaDoc = (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Lista de Asistencia</Text>
        <View style={styles.row} key='empty'>
          <Text style={styles.nameCell}> </Text>
          {Array.from({ length: 15 }).map((_, j) => (
            <Text style={styles.cell} key={j}> </Text>
          ))}
        </View>
        {estudiantes.map((estudiante, i) => (
          <View style={styles.row} key={i}>
            <Text style={styles.nameCell}>{estudiante.nombres} {estudiante.apellidos}</Text>
            {Array.from({ length: 15 }).map((_, j) => (
              <Text style={styles.cell} key={j}> </Text>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  )

  return (
    <PDFDownloadLink document={ListaDoc} fileName='listaAsistencia.pdf'>
      {({ blob, url, loading, error }) =>
        <button className={`${loading ? 'disabled' : ''} inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
          <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path fillRule='evenodd' d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z' clipRule='evenodd' />
          </svg>
          {loading ? 'Loading document...' : 'Descargar Lista de Asistencia'}
        </button>}
    </PDFDownloadLink>
  )
}
