import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
})

let initialized = false
export async function connectToDatabase () {
  if (!initialized) {
    try {
      await sequelize.authenticate()
      console.log('Conexion exitosa')
      await sequelize.sync({ alter: true }) // Quitar el force despues
      console.log('Tablas creadas')
      initialized = true
    } catch (error) {
      console.error('Error de conexion a la BD: ', error)
    }
  }
}
