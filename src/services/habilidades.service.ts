// habilidades.service.ts
const API_BASE = 'http://localhost:8000/api/v1'

function getAuthToken(): string {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  return token ?? ''
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
      ...(options.headers ?? {})
    }
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const message =
      body?.message ??
      body?.errors?.[Object.keys(body?.errors ?? {})[0]]?.[0] ??
      `Error ${res.status}`
    throw new Error(message)
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

// ─── Tipos de la API ──────────────────────────────────────────────────────────
export interface ApiCatalogSkill {
  id: number
  name: string
  type: 'tecnica' | 'blanda'
  category: string
}

/**
 * Skill del portfolio del usuario.
 * IMPORTANTE: la respuesta real del backend tiene los campos name/type/category
 * APLANADOS en el objeto — NO hay una relación `skill` anidada.
 *
 * Respuesta real:
 * { id, skill_id, name, type, category, level, is_active, created_at, updated_at }
 */
export interface ApiPortfolioSkill {
  id: number
  skill_id: number
  name: string
  type: 'tecnica' | 'blanda'
  category: string
  level: 'basico' | 'intermedio' | 'avanzado' | null
  is_active: boolean
  created_at: string
  updated_at: string
}

// ─── Wrappers de respuesta ────────────────────────────────────────────────────
interface ApiPortfolioSkillsResponse {
  data: {
    tecnica: Record<string, ApiPortfolioSkill[]>
    blanda: Record<string, ApiPortfolioSkill[]>
  }
}

interface ApiPortfolioSkillResponse {
  data: ApiPortfolioSkill
}

interface ApiCatalogResponse {
  data: {
    tecnica: Record<string, ApiCatalogSkill[]>
    blanda: Record<string, ApiCatalogSkill[]>
  }
}

interface ApiCatalogSkillResponse {
  data: ApiCatalogSkill
}

// ─── Funciones del servicio ───────────────────────────────────────────────────

/** GET /portfolio/skills → array plano de skills del usuario */
export async function getPortfolioSkills(): Promise<ApiPortfolioSkill[]> {
  const res = await apiFetch<ApiPortfolioSkillsResponse>('/portfolio/skills')
  const tecnicas = Object.values(res.data?.tecnica ?? {}).flat()
  const blandas = Object.values(res.data?.blanda ?? {}).flat()
  return [...tecnicas, ...blandas]
}

/** GET /skills/catalog → array plano del catálogo global */
export async function getCatalogSkills(): Promise<ApiCatalogSkill[]> {
  const res = await apiFetch<ApiCatalogResponse>('/skills/catalog')
  const tecnicas = Object.values(res.data?.tecnica ?? {}).flat()
  const blandas = Object.values(res.data?.blanda ?? {}).flat()
  return [...tecnicas, ...blandas]
}

/** POST /portfolio/skills */
export async function addPortfolioSkill(
  skillId: number,
  level?: 'basico' | 'intermedio' | 'avanzado'
): Promise<ApiPortfolioSkill> {
  const body: { skill_id: number; level?: string } = { skill_id: skillId }
  if (level) body.level = level
  const res = await apiFetch<ApiPortfolioSkillResponse>('/portfolio/skills', {
    method: 'POST',
    body: JSON.stringify(body)
  })
  return res.data
}

/** PUT /portfolio/skills/{id} — solo actualiza el nivel */
export async function updatePortfolioSkill(
  portfolioSkillId: number,
  level: 'basico' | 'intermedio' | 'avanzado'
): Promise<ApiPortfolioSkill> {
  const res = await apiFetch<ApiPortfolioSkillResponse>(`/portfolio/skills/${portfolioSkillId}`, {
    method: 'PUT',
    body: JSON.stringify({ level })
  })
  return res.data
}

/** DELETE /portfolio/skills/{id} */
export async function deletePortfolioSkill(portfolioSkillId: number): Promise<void> {
  return apiFetch<void>(`/portfolio/skills/${portfolioSkillId}`, { method: 'DELETE' })
}

/** POST /admin/skills — sugerencia de nueva habilidad */
export async function suggestSkill(
  name: string,
  type: 'tecnica' | 'blanda',
  category: string,
  description?: string
): Promise<ApiCatalogSkill> {
  const body: { name: string; type: string; category: string; description?: string } = {
    name,
    type,
    category
  }
  if (description) body.description = description
  const res = await apiFetch<ApiCatalogSkillResponse>('/admin/skills', {
    method: 'POST',
    body: JSON.stringify(body)
  })
  return res.data
}
