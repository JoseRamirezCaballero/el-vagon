/* eslint-disable camelcase */ // Desactivar la regla de linting que requiere el uso de camelCase para los identificadores

// Importar las dependencias necesarias
import { DataTypes } from 'sequelize' // Importar el módulo DataTypes de Sequelize, que proporciona los tipos de datos para los modelos de Sequelize
import { sequelize } from '../utils/database' // Importar la instancia de la base de datos desde el archivo 'database.js'
import { TablaRol } from './rol.model' // Importar el modelo 'TablaRol' relacionado

// Definir el modelo 'TablaEstudiante' utilizando Sequelize
export const TablaEstudiante = sequelize.define('Estudiante', {
  idEstudiante: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Indicar que es la clave primaria de la tabla
    allowNull: false, // No permitir valores nulos para este campo
    autoIncrement: true // Configurar la autoincrementación para generar automáticamente valores únicos
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false // No permitir valores nulos para este campo
  },
  nombres: {
    type: DataTypes.STRING(30),
    allowNull: false // No permitir valores nulos para este campo
  },
  apellidos: {
    type: DataTypes.STRING(30),
    allowNull: false // No permitir valores nulos para este campo
  },
  numero_control: {
    type: DataTypes.STRING(10),
    allowNull: false, // No permitir valores nulos para este campo
    unique: true // Indicar que los valores deben ser únicos en la tabla
  },
  carrera: {
    type: DataTypes.STRING(50),
    allowNull: false // No permitir valores nulos para este campo
  },
  genero: {
    type: DataTypes.STRING(9),
    allowNull: false // No permitir valores nulos para este campo
  },
  correo_institucional: {
    type: DataTypes.STRING(30),
    allowNull: true // Permitir valores nulos para este campo
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false // No permitir valores nulos para este campo
  }
}, {
  timestamps: true, // Agregar automáticamente los campos de fecha 'createdAt' y 'updatedAt' para el seguimiento temporal
  tableName: 'Estudiante' // Especificar el nombre de la tabla en la base de datos como 'Estudiante'
})

// Definir una función personalizada para validar las credenciales de un estudiante
TablaEstudiante.validateCredentials = async function (numero_control, password) {
  const estudiante = await TablaEstudiante.findOne({ where: { numero_control, password } })
  if (!estudiante) {
    return null // Si no se encuentra un estudiante con las credenciales proporcionadas, devolver nulo
  }
  return estudiante // Devolver el estudiante si las credenciales son válidas
}

// Establecer la relación entre 'TablaRol' y 'TablaEstudiante'
TablaRol.hasMany(TablaEstudiante, { foreignKey: 'idRol' }) // Un rol puede tener varios estudiantes
TablaEstudiante.belongsTo(TablaRol, { foreignKey: 'idRol' }) // Un estudiante pertenece a un único rol