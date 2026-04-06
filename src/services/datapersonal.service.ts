import { API_BASE_URL } from '../utils/constants'

// Función auxiliar para obtener el token de las fuentes posibles
const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token')

export const getPersonalData = async () => {
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
    // Si el backend devuelve 404, significa que el usuario aún no tiene un registro de portafolio
    if (response.status === 404) {
      return null
    }
    throw new Error('Error al obtener los datos personales del servidor')
  }

  const result = await response.json()
  // Retornamos la propiedad 'data' que es donde el PortfolioResource de Laravel envuelve los datos
  return result.data
}
