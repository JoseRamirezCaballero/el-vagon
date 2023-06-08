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
  { name: 'Categorías', url: '/estudiante/categoria' },
  { name: 'Historial', url: '/estudiante/historial' }
]

export const ADMIN_ROUTES = [
  { name: 'Actividades', url: '/admin/actividad/' },
  { name: 'Crear Actividad', url: '/admin/actividad/create' },
  { name: 'Crear Responsable', url: '/admin/responsable/create' }
]

export const RESPONSABLE_ROUTES = [
  { name: 'Asignaciones', url: '/responsable/asignaciones' }
]
