import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer'

export default function HorarioPDF ({ actividad, responsable, profile }) {
  Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu4mxPKTU1Kg.ttf' })
  Font.register({ family: 'Roboto-Bold', src: 'http://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOKCWcynf_cDxXwCLxiixG1c.ttf' })

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4'
    },
    header: {
      fontSize: 24,
      textAlign: 'center',
      marginTop: 40,
      marginBottom: 30,
      fontFamily: 'Roboto-Bold'
    },
    subheader: {
      fontSize: 18,
      marginBottom: 15,
      fontFamily: 'Roboto-Bold'
    },
    signature: {
      marginTop: 50,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderStyle: 'dashed',
      height: 100
    },
    table: {
      display: 'table',
      width: 'auto',
      margin: 20
    },
    row: {
      flexDirection: 'row',
      borderBottomColor: '#bbb',
      borderBottomWidth: 1
    },
    cell: {
      flexGrow: 1,
      flexBasis: '50%',
      padding: 10
    },
    label: {
      padding: 10,
      fontWeight: 'bold'
    },
    value: {
      padding: 10
    },
    signatureLine: {
      marginTop: 50,
      borderBottomWidth: 1
    },
    signatureBox: {
      marginTop: 20,
      marginBottom: 50
    },
    signatureText: {
      textAlign: 'center',
      fontStyle: 'italic'
    }
  })

  const HorarioDoc = (
    <Document>
      <Page size='A4' style={styles.page}>

        <Text style={styles.header}>Horario de Actividad Extraescolar</Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.label}>Número de Control:</Text>
              <Text style={styles.value}>{profile.numero_control}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>Estudiante:</Text>
              <Text style={styles.value}>{`${profile.nombres} ${profile.apellidos}`}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.label}>Carrera:</Text>
              <Text style={styles.value}>{profile.carrera}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>Género:</Text>
              <Text style={styles.value}>{profile.genero}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.label}>Nombre de Actividad:</Text>
              <Text style={styles.value}>{actividad.nombre}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>Responsable:</Text>
              <Text style={styles.value}>{`${responsable.abreviatura_cargo} ${responsable.nombres} ${responsable.apellidos}`}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.label}>Categoría:</Text>
              <Text style={styles.value}>{actividad.categoria}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>Periodo:</Text>
              <Text style={styles.value}>{actividad.periodo}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.label}>Lugar:</Text>
              <Text style={styles.value}>{actividad.lugar}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>Horario:</Text>
              <Text style={styles.value}>{actividad.horario}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.label}>Capacidad máxima:</Text>
              <Text style={styles.value}>{actividad.capacidad_maxima}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>Créditos:</Text>
              <Text style={styles.value}>{actividad.creditos}</Text>
            </View>
          </View>
        </View>

        <View style={styles.signatureLine} />
        <View style={styles.signatureBox}>
          <Text style={styles.signatureText}>Coordinación de Actividades Complementarias</Text>
        </View>
      </Page>
    </Document>
  )

  return (
    <PDFDownloadLink document={HorarioDoc} fileName={`horario-${profile.numero_control}.pdf`}>
      {({ blob, url, loading, error }) =>
        <button className={`${loading ? 'disabled' : ''} inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
          <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path fillRule='evenodd' d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z' clipRule='evenodd' />
          </svg>
          {loading ? 'Loading document...' : 'Descargar Horario'}
        </button>}
    </PDFDownloadLink>
  )
}
