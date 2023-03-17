import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/database'

export const TablaActividad = sequelize.define('actividad', {
  idActividad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true
  },
  categoria: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  periodo: {
    type: DataTypes.STRING(35),
    allowNull: false
  },
  cupo_maximo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Actividad'
})