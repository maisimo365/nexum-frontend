import { API_BASE_URL } from '../utils/constants'

// Definimos una interfaz para los datos que vienen del formulario
interface PersonalDataUpdate {
  nombre: string
  apellido: string
  tituloProfesional: string
  telefono: string
  ubicacion: string
  biografia: string
}

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
    if (response.status === 404) {
      return null
    }
    throw new Error('Error al obtener los datos personales del servidor')
  }

  const result = await response.json()
  return result.data
}

/**
 * Función para guardar cambios de Datos Personales
 * Recupera datos actuales y los fusiona para preservar campos de otros formularios
 */
export const updatePersonalData = async (data: PersonalDataUpdate) => {
  const token = getToken()

  // Recuperar datos actuales para preservar enlaces y privacidad
  const currentData = await getPersonalData()

  const response = await fetch(`${API_BASE_URL}/portfolio`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      first_name: data.nombre,
      last_name: data.apellido,
      profession: data.tituloProfesional,
      phone: data.telefono,
      location: data.ubicacion,
      biography: data.biografia,
      // Preservar datos de enlaces que ya existen
      linkedin_url: currentData?.linkedin_url,
      github_url: currentData?.github_url,
      global_privacy: currentData?.global_privacy
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Error al guardar los datos')
  }

  return await response.json()
}
