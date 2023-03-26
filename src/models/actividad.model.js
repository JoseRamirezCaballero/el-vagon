import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/database'
import { TablaResponsable } from './responsable.model'

export const TablaActividad = sequelize.define('actividad', {
  idActividad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  creditos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  carrera: {
    type: DataTypes.STRING(50),
    allowNull: true
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
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  idResponsable: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Actividad'
})

TablaResponsable.hasMany(TablaActividad, { foreignKey: 'idResponsable' })
TablaActividad.belongsTo(TablaResponsable, { foreignKey: 'idResponsable' })
