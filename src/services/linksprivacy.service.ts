import { API_BASE_URL } from '../utils/constants'

const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token')

export const getLinksPrivacyData = async () => {
  const token = getToken()

  const response = await fetch(`${API_BASE_URL}/portfolio`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    if (response.status === 404) return null
    throw new Error('Error al obtener los enlaces y privacidad')
  }

  const result = await response.json()
  return result.data
}

export const updateLinksPrivacyData = async (payload: any) => {
  const token = getToken()

  // Preparamos el cuerpo con TODOS los campos que el PortfolioRequest valida
  const body = {
    first_name: payload.nombre,
    last_name: payload.apellido,
    linkedin_url: payload.linkedin?.trim() || null,
    github_url: payload.github?.trim() || null,
    global_privacy: payload.global_privacy
  }

  const response = await fetch(`${API_BASE_URL}/portfolio`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const result = await response.json()

  if (!response.ok) {
    // Si hay error de validación (422), mostramos qué campo falló
    const errorMessage = result.errors
      ? Object.values(result.errors).flat().join(' ')
      : result.message
    throw new Error(errorMessage || 'Error al actualizar los datos')
  }

  return result
}
