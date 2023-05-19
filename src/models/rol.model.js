/* eslint-disable camelcase */ 

// Importar las dependencias necesarias
import { DataTypes } from 'sequelize' // Importar el módulo DataTypes de Sequelize, que proporciona los tipos de datos para los modelos de Sequelize
import { sequelize } from '../utils/database' // Importar la instancia de la base de datos desde el archivo 'database.js'

// Definir el modelo 'TablaRol' utilizando Sequelize
export const TablaRol = sequelize.define('Rol', {
  idRol: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Indicar que es la clave primaria de la tabla
    allowNull: false, // No permitir valores nulos para este campo
    autoIncrement: true // Configurar la autoincrementación para generar automáticamente valores únicos
  },
  rol: {
    type: DataTypes.STRING(20),
    allowNull: false // No permitir valores nulos para este campo
  }
}, {
  timestamps: true, // Agregar automáticamente los campos de fecha 'createdAt' y 'updatedAt' para el seguimiento temporal
  tableName: 'Rol' // Especificar el nombre de la tabla en la base de datos como 'Rol'
})
