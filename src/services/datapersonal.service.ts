import { API_BASE_URL } from '../utils/constants'

interface PersonalDataUpdate {
  nombre: string
  apellido: string
  tituloProfesional: string
  telefono: string
  ubicacion: string
  biografia: string
  linkedin?: string
  github?: string
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

export const updatePersonalData = async (data: PersonalDataUpdate) => {
  const token = getToken()

  // Recuperamos datos actuales para no sobrescribir con nulo los campos de otras pestañas
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

/**
 * Sube el archivo de imagen al endpoint configurado en el backend
 */
export const uploadAvatar = async (file: File) => {
  const token = getToken()

  const formData = new FormData()
  formData.append('avatar', file)

  const response = await fetch(`${API_BASE_URL}/portfolio/avatar`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    },
    body: formData
  })

  let result
  try {
    result = await response.json()
  } catch {
    // Si no se puede parsear como JSON, usar el texto de la respuesta
    const text = await response.text()
    throw new Error(`Error del servidor: ${response.status} - ${text}`)
  }

  if (!response.ok) {
    throw new Error(
      result.message ||
        `Error del servidor: ${response.status} - ${result.error || 'Error desconocido'}`
    )
  }

  return result
}
