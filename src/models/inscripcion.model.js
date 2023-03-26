import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/database'
import { TablaEstudiante } from './estudiante.model'
import { TablaActividad } from './actividad.model'

export const TablaInscripcion = sequelize.define('inscripcion', {
  idIncripcion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idEstudiante: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idActividad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Inscripcion'
})

TablaInscripcion.belongsTo(TablaEstudiante, {
  foreignKey: 'idEstudiante'
})

TablaInscripcion.belongsTo(TablaActividad, {
  foreignKey: 'idActividad'
})

TablaEstudiante.hasMany(TablaInscripcion, {
  foreignKey: 'idEstudiante'
})

TablaActividad.hasMany(TablaInscripcion, {
  foreignKey: 'idActividad'
})
