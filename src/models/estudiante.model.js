import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/database'

export const TablaEstudiante = sequelize.define('Estudiante', {
  idEstudiante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nombres: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  numero_control: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  carrera: {
    type: DataTypes.STRING(35),
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(9),
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Estudiante'
})
