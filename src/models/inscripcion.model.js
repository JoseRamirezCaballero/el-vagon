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

TablaInscripcion.validateInscripcion = async function (idEstudiante, periodoActual) {
  const inscripciones = await TablaInscripcion.findAll({
    where: { idEstudiante }
  })

  for (const inscripcion of inscripciones) {
    const idActividad = inscripcion.dataValues.idActividad
    const actividad = await TablaActividad.findOne({
      where: {
        idActividad
      }
    })

    if (actividad.dataValues.periodo === periodoActual) {
      return inscripcion.dataValues
    }
  }
  return null
}

TablaInscripcion.belongsTo(TablaEstudiante, {
  foreignKey: 'idEstudiante'
})

TablaInscripcion.belongsTo(TablaActividad, {
  foreignKey: 'idActividad',
  onDelete: 'CASCADE'
})

TablaEstudiante.hasMany(TablaInscripcion, {
  foreignKey: 'idEstudiante'
})

TablaActividad.hasMany(TablaInscripcion, {
  foreignKey: 'idActividad'
})
