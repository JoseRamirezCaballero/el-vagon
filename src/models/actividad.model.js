// Importar las dependencias necesarias
import { DataTypes } from 'sequelize' // Importar el módulo DataTypes de Sequelize, que proporciona los tipos de datos para los modelos de Sequelize
import { sequelize } from '../utils/database' // Importar la instancia de la base de datos desde el archivo 'database.js'
import { TablaResponsable } from './responsable.model' // Importar el modelo 'TablaResponsable' relacionado para establecer la relación

// Definir el modelo 'TablaActividad' utilizando Sequelize
export const TablaActividad = sequelize.define('actividad', {
  idActividad: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Indicar que es la clave primaria de la tabla
    allowNull: false, // No permitir valores nulos para este campo
    autoIncrement: true // Configurar la autoincrementación para generar automáticamente valores únicos
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false // No permitir valores nulos para este campo
  },
  creditos: {
    type: DataTypes.INTEGER,
    allowNull: false // No permitir valores nulos para este campo
  },
  categoria: {
    type: DataTypes.STRING(15),
    allowNull: false // No permitir valores nulos para este campo
  },
  carrera: {
    type: DataTypes.STRING(50),
    allowNull: true // Permitir valores nulos para este campo
  },
  periodo: {
    type: DataTypes.STRING(35),
    allowNull: false // No permitir valores nulos para este campo
  },
  lugar: {
    type: DataTypes.STRING(50),
    allowNull: false // No permitir valores nulos para este campo
  },
  horario: {
    type: DataTypes.STRING(15),
    allowNull: false // No permitir valores nulos para este campo
  },
  capacidad_maxima: {
    type: DataTypes.INTEGER,
    allowNull: false // No permitir valores nulos para este campo
  },
  estatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false // No permitir valores nulos para este campo
  },
  idResponsable: {
    type: DataTypes.INTEGER,
    allowNull: false // No permitir valores nulos para este campo
  }
}, {
  timestamps: true, // Agregar automáticamente los campos de fecha 'createdAt' y 'updatedAt' para el seguimiento temporal
  tableName: 'Actividad' // Especificar el nombre de la tabla en la base de datos como 'Actividad'
})

// Establecer la relación entre 'TablaResponsable' y 'TablaActividad'
TablaResponsable.hasMany(TablaActividad, { foreignKey: 'idResponsable' }) // Un responsable puede tener varias actividades
TablaActividad.belongsTo(TablaResponsable, { foreignKey: 'idResponsable' }) // Una actividad pertenece a un único responsable
