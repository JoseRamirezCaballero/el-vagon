/* eslint-disable camelcase */
import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/database'

export const TablaRol = sequelize.define('Rol', {
  idRol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  rol: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Rol'
})
