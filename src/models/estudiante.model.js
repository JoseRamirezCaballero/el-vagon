/* eslint-disable camelcase */
import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/database'
import { TablaRol } from './rol.model'

export const TablaEstudiante = sequelize.define('Estudiante', {
  idEstudiante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombres: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  numero_control: {
    type: DataTypes.STRING(9),
    allowNull: false,
    unique: true
  },
  carrera: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
  correo_institucional: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(15),
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Estudiante'
})

TablaEstudiante.validateCredentials = async function (numero_control, password) {
  const estudiante = await TablaEstudiante.findOne({ where: { numero_control, password } })
  if (!estudiante) {
    return null
  }
  return estudiante
}

TablaRol.hasMany(TablaEstudiante, {
  foreignKey: 'idRol'
})

TablaEstudiante.belongsTo(TablaRol, {
  foreignKey: 'idRol'
})
