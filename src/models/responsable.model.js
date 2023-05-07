/* eslint-disable camelcase */
import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/database'
import { TablaRol } from './rol.model'

export const TablaResponsable = sequelize.define('responsable', {
  idResponsable: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  },
  numero_control: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Responsable'
})

TablaResponsable.validateCredentials = async function (numero_control, password) {
  const responsable = await TablaResponsable.findOne({ where: { numero_control, password } })
  if (!responsable) {
    return null
  }
  return responsable
}

TablaRol.hasMany(TablaResponsable, {
  foreignKey: 'idRol'
})

TablaResponsable.belongsTo(TablaRol, {
  foreignKey: 'idRol'
})
