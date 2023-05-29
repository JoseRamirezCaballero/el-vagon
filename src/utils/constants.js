export const ROLES = {
  ESTUDIANTE: 1,
  ADMINISTRADOR: 2,
  RESPONSABLE: 3
}

export const STUDENT_ROUTES = [
  { name: 'Inicio', url: '/estudiante' },
  { name: 'Categorías', url: '/estudiante/categoria' }
]

export const ADMIN_ROUTES = [
  { name: 'Inicio', url: '/admin' },
  { name: 'Actividades', url: '/admin/actividad/' },
  { name: 'Crear Actividad', url: '/admin/actividad/create' },
  { name: 'Crear Responsable', url: '/admin/responsable/create' }
]

export const RESPONSABLE_ROUTES = [
  { name: 'Inicio', url: '/responsable' }
]
