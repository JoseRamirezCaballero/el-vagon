import axios from 'axios'

export const axiosAPI = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export const ROLES = {
  ESTUDIANTE: 1,
  ADMINISTRADOR: 2,
  RESPONSABLE: 3
}

export const STUDENT_ROUTES = [
  { name: 'Inicio', url: '/estudiante' },
  { name: 'Categorías', url: '/estudiante/categoria' },
  { name: 'Historial', url: '/estudiante/historial' }
]

export const ADMIN_ROUTES = [
  { name: 'Inicio', url: '/admin' },
  { name: 'Actividades', url: '/admin/actividad/' },
  { name: 'Crear Actividad', url: '/admin/actividad/create' },
  { name: 'Crear Responsable', url: '/admin/responsable/create' }
]

export const RESPONSABLE_ROUTES = [
  { name: 'Inicio', url: '/responsable' },
  { name: 'Asignaciones', url: '/responsable/asignaciones' }
]
