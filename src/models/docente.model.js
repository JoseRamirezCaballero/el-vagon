import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/database'

export const TablaDocente = sequelize.define('docente', {
  idDocente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  abreviatura_cargo: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  nombres: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(9),
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Docente'
})
