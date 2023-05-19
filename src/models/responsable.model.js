/* eslint-disable camelcase */ // Desactivar la regla de linting que requiere el uso de camelCase para los identificadores

// Importar las dependencias necesarias
import { DataTypes } from 'sequelize' // Importar el módulo DataTypes de Sequelize, que proporciona los tipos de datos para los modelos de Sequelize
import { sequelize } from '../utils/database' // Importar la instancia de la base de datos desde el archivo 'database.js'
import { TablaRol } from './rol.model' // Importar el modelo 'TablaRol' relacionado

// Definir el modelo 'TablaResponsable' utilizando Sequelize
export const TablaResponsable = sequelize.define('responsable', {
  idResponsable: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Indicar que es la clave primaria de la tabla
    allowNull: false, // No permitir valores nulos para este campo
    autoIncrement: true // Configurar la autoincrementación para generar automáticamente valores únicos
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false // No permitir valores nulos para este campo
  },
  abreviatura_cargo: {
    type: DataTypes.STRING(15),
    allowNull: false // No permitir valores nulos para este campo
  },
  nombres: {
    type: DataTypes.STRING(25),
    allowNull: false // No permitir valores nulos para este campo
  },
  apellidos: {
    type: DataTypes.STRING(25),
    allowNull: false // No permitir valores nulos para este campo
  },
  genero: {
    type: DataTypes.STRING(9),
    allowNull: false // No permitir valores nulos para este campo
  },
  numero_control: {
    type: DataTypes.STRING(10),
    allowNull: false, // No permitir valores nulos para este campo
    unique: true // Indicar que los valores deben ser únicos en la tabla
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false // No permitir valores nulos para este campo
  }
}, {
  timestamps: true, // Agregar automáticamente los campos de fecha 'createdAt' y 'updatedAt' para el seguimiento temporal
  tableName: 'Responsable' // Especificar el nombre de la tabla en la base de datos como 'Responsable'
})

// Definir una función personalizada para validar las credenciales de un responsable
TablaResponsable.validateCredentials = async function (numero_control, password) {
  const responsable = await TablaResponsable.findOne({ where: { numero_control, password } })
  if (!responsable) {
    return null // Si no se encuentra un responsable con las credenciales proporcionadas, devolver nulo
  }
  return responsable // Devolver el responsable si las credenciales son válidas
}

// Establecer la relación entre 'TablaRol' y 'TablaResponsable'
TablaRol.hasMany(TablaResponsable, { foreignKey: 'idRol' }) // Un rol puede tener varios responsables
TablaResponsable.belongsTo(TablaRol, { foreignKey: 'idRol' }) // Un responsable pertenece a un único rol
