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
  creditos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  periodo: {
    type: DataTypes.STRING(35),
    allowNull: false
  },
  lugar: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  horario: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  capacidad_maxima: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estatus: {
    type: DataTypes.STRING(8),
    allowNull: false
  },
  // este se cambiara a fk
  responsable: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Actividad'
})
