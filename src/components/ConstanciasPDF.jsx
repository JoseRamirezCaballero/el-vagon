import { Page,View, Text, Document,Image as PDFImage, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer'

export default function ConstanciasPDF ({ estudiante }) {
  Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu4mxPKTU1Kg.ttf' })
  Font.register({ family: 'Roboto-Bold', src: 'http://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOKCWcynf_cDxXwCLxiixG1c.ttf' })


  const styles = StyleSheet.create({
    body: {
      paddingTop: 15,
      paddingBottom: 20,
      paddingHorizontal: 35,
      fontFamily: 'Roboto'
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Roboto-Bold'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Roboto'
    }
  })
  const imageUrl = '/img/footerpdf.png';
  const imageUrl2 = '/img/headerpdf.png';

  const ListaDoc = (
    <Document>
      <Page style={styles.body}>
      <View style={{ width: '100%' }}>
          <PDFImage
            src={imageUrl2}
            style={{ width: '100%', height: 'auto' }}
          />
        </View>
        <Text style={styles.title}>CONSTANCIA DE CUMPLIMIENTO DE ACTIVIDAD COMPLEMENTARIA</Text>
        <Text style={styles.text}>HUITZILI DÍAZ JAIMES</Text>
        <Text style={styles.text}>JEFA DEL DEPARTAMENTO DE SERVICIOS ESCOLARES</Text>
        <Text style={styles.text}>PRESENTE</Text>
        <Text style={styles.text}>El que suscribe PROF. E.F. LUIS REY LUNA DÍAZ, por este medio se permite hacer de su conocimiento que el estudiante {estudiante.apellidos} {estudiante.nombres} con número de control {estudiante.numero_control} de la carrera de {estudiante.carrera} ha cumplido su actividad complementaria con el nivel de desempeño BUENO y un valor numérico de 2.0.</Text>
     
      <View style={{ marginTop: 'auto', width: '100%' }}>
          <PDFImage
            src={imageUrl}
            style={{ width: '100%', height: 'auto' }}
          />
        </View>
     
      </Page>
    </Document>
  )

  return (
    <PDFDownloadLink document={ListaDoc} fileName='constancia.pdf'>
      {({ blob, url, loading, error }) =>
        <button className={`${loading ? 'disabled' : ''} inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
          <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path fillRule='evenodd' d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z' clipRule='evenodd' />
          </svg>
          {loading ? 'Loading document...' : 'Descargar constancia'}
        </button>}
    </PDFDownloadLink>
  )
}
