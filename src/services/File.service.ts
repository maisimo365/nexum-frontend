// ─── file.service.ts ─────────────────────────────────────────────────────────
// Servicio para manejo de archivos adjuntos a proyectos
// Endpoints provistos por backend (Luis Fernando):
//   POST   /api/v1/projects/:projectId/files   → subir uno o más archivos
//   GET    /api/v1/projects/:projectId/files   → listar archivos del proyecto
//   DELETE /api/v1/projects/:projectId/files/:fileId → eliminar archivo
import { API_BASE_URL } from '../utils/constants'
//const API_BASE = import.meta.env.VITE_API_URL ?? "/api/v1";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProjectFile {
  id: number
  type: 'image' | 'pdf'
  url: string
  original_name: string
  order: number
}

export interface UploadFilesResponse {
  data: ProjectFile[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}`, Accept: 'application/json' } : {}
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.message ?? `Error ${res.status}: ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

// ─── uploadProjectFiles ───────────────────────────────────────────────────────
// Sube uno o más archivos al proyecto creado.
// Usa FormData con campo "files" (acepta múltiples).
// Retorna la lista de archivos guardados con sus URLs de Cloudinary.
//
// onProgress(pct): callback opcional para actualizar barra (0-100).
// Nota: XHR en lugar de fetch para poder leer el progreso real.

export function uploadProjectFiles(
  projectId: number,
  files: File[],
  onProgress?: (pct: number) => void
): Promise<UploadFilesResponse> {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    files.forEach((file) => formData.append('files[]', file))

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${API_BASE_URL}/projects/${projectId}/files`)
    xhr.setRequestHeader('Accept', 'application/json')
    // Auth header
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    // Progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100))
        }
      })
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText) as UploadFilesResponse)
        } catch {
          reject(new Error('Respuesta inválida del servidor.'))
        }
      } else {
        let msg = `Error ${xhr.status}`
        try {
          msg = JSON.parse(xhr.responseText)?.message ?? msg
        } catch {
          /* noop */
        }
        reject(new Error(msg))
      }
    }

    xhr.onerror = () => reject(new Error('Error de red al subir archivos.'))
    xhr.send(formData)
  })
}

// ─── getProjectFiles ──────────────────────────────────────────────────────────

export async function getProjectFiles(projectId: number): Promise<ProjectFile[]> {
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}/files`, {
    headers: { ...getAuthHeaders() }
  })
  const body = await handleResponse<{ data: ProjectFile[] }>(res)
  return body.data
}

// ─── deleteProjectFile ────────────────────────────────────────────────────────

export async function deleteProjectFile(projectId: number, fileId: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}/files/${fileId}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() }
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.message ?? `Error ${res.status}`)
  }
}
