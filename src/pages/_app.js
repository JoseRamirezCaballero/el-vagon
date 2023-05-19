// Importar el archivo CSS global llamado "globals.css" ubicado en la carpeta de estilos
import '@/styles/globals.css'

// Definir una función llamada "App" que se exporta por defecto
export default function App ({ Component, pageProps }) {
  // Devolver un JSX que representa el componente "Component" junto con las propiedades "pageProps"
  return (
    <Component {...pageProps} />
  )
}