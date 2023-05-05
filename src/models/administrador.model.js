/* eslint-disable camelcase */
import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/database'
import { TablaRol } from './rol.model'

export const TablaAdministrador = sequelize.define('Administrador', {
  idAdministrador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idRol: {
    type: DataTypes.INTEGER,
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
  tableName: 'Administrador'
})

TablaAdministrador.validateCredentials = async function (numero_control, password) {
  const administrador = await TablaAdministrador.findOne({ where: { numero_control, password } })
  if (!administrador) {
    return null
  }
  return administrador
}

TablaRol.hasMany(TablaAdministrador, {
  foreignKey: 'idRol'
})

TablaAdministrador.belongsTo(TablaRol, {
  foreignKey: 'idRol'
})
