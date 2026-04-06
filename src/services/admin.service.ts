import { API_BASE_URL } from "../utils/constants";

const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

const handleUnauthorized = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  window.location.href = "/login";
};

export const getUsers = async () => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    handleUnauthorized();
    return [];
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener usuarios.");
  }

  return data.data.map((u: any) => ({
    id: u.id,
    name: `${u.first_name} ${u.last_name}`,
    email: u.email,
    role: u.role === "professional" ? "Profesional" : "Administrador",
    status: u.is_active ? "Activo" : "Inactivo",
    registro: new Date(u.created_at).toLocaleDateString("es-ES"),
    portfolio: u.portfolio?.global_privacy === "public" ? "Publicado" : "Privado",
  }));
};

export const toggleUserStatus = async (userId: number): Promise<void> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/toggle-status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    handleUnauthorized();
    return;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al cambiar el estado del usuario.");
  }

  return data;
};