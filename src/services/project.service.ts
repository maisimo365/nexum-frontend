import { API_BASE_URL } from '../utils/constants'

const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token')

export interface Project {
  id: number
  title: string
  description: string
  role: string
  project_url?: string
  archived: boolean
  category?: {
    id: number
    name: string
  }
  skills?: {
    id: number
    name: string
  }[]
  created_at: string
  updated_at?: string
}

export const getProjects = async (): Promise<Project[]> => {
  const token = getToken()

  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    if (response.status === 404) {
      return []
    }
    throw new Error('Error al obtener los proyectos')
  }

  const result = await response.json()
  return result.data || result || []
}

export const deleteProject = async (id: number): Promise<void> => {
  const token = getToken()

  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.message || 'Error al eliminar el proyecto')
  }
}
