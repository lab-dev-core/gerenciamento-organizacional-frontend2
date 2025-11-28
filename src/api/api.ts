import axios from "axios"

const API_BASE_URL = import.meta.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"


// Instância principal
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
})

// -------------------------------------------------------------
// TOKEN
// -------------------------------------------------------------
let tokenCache: string | null = null

export function setToken(token: string) {
  tokenCache = token
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token)
  }
}

export function getToken(): string | null {
  if (tokenCache) return tokenCache
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

export function clearToken() {
  tokenCache = null
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
  }
}

// -------------------------------------------------------------
// INTERCEPTORS
// -------------------------------------------------------------
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken()
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
    }
    return Promise.reject({
      message: error.message,
      status: error.response?.status,
    })
  }
)

// -------------------------------------------------------------
// FUNÇÕES BASE
// -------------------------------------------------------------
export const ApiClient = {
  get: async <T>(url: string) => (await api.get<T>(url)).data,
  post: async <T>(url: string, data?: any) => (await api.post<T>(url, data)).data,
  put: async <T>(url: string, data?: any) => (await api.put<T>(url, data)).data,
  delete: async <T>(url: string) => (await api.delete<T>(url)).data,
}

// -------------------------------------------------------------
// AUTH
// -------------------------------------------------------------
export const authApi = {
  login: (username: string, password: string) =>
    ApiClient.post<{
      token: string
      id: number
      username: string
      name: string
      role: string
    }>("/api/auth/login", { username, password }),
}

// -------------------------------------------------------------
// USERS
// -------------------------------------------------------------
export const usersApi = {
  getAll: () => ApiClient.get<any[]>("/api/users"),
  getById: (id: number) => ApiClient.get<any>(`/api/users/${id}`),
  create: (user: any) => ApiClient.post<any>("/api/users", user),
  update: (id: number, user: any) => ApiClient.put<any>(`/api/users/${id}`, user),
  delete: (id: number) => ApiClient.delete<void>(`/api/users/${id}`),

  assignRole: (userId: number, roleId: number) =>
    ApiClient.put<any>(`/api/users/${userId}/role/${roleId}`, {}),
}

// -------------------------------------------------------------
// DOCUMENTS
// -------------------------------------------------------------
export const documentsApi = {
  getAccessible: () => ApiClient.get<any[]>("/api/documents"),
  getById: (id: number) => ApiClient.get<any>(`/api/documents/${id}`),
  create: (document: any) => ApiClient.post<any>("/api/documents", document),
  update: (id: number, document: any) => ApiClient.put<any>(`/api/documents/${id}`, document),
  delete: (id: number) => ApiClient.delete<void>(`/api/documents/${id}`),

  getByStage: (stage: string) => ApiClient.get<any[]>(`/api/documents/by-stage/${stage}`),
  getByLocation: (locationId: number) => ApiClient.get<any[]>(`/api/documents/by-location/${locationId}`),

  uploadFile: async (documentId: number, file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const res = await api.post(
      `/api/documents/${documentId}/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )

    return res.data
  },

  downloadFile: async (documentId: number, fileName: string) => {
    const res = await api.get(`/api/documents/${documentId}/download`, {
      responseType: "blob",
    })

    const url = window.URL.createObjectURL(res.data)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  },
}

// -------------------------------------------------------------
// SEARCH
// -------------------------------------------------------------
export const searchApi = {
  searchDocuments: (params: any) => {
    const query = new URLSearchParams(params).toString()
    return ApiClient.get<any>(`/api/search/documents?${query}`)
  },
  searchByContent: (text: string) =>
    ApiClient.get<any[]>(`/api/search/content?text=${encodeURIComponent(text)}`),
  getRecent: () => ApiClient.get<any[]>("/api/search/recent"),
  getMostViewed: (page = 0, size = 10) =>
    ApiClient.get<any[]>(`/api/search/most-viewed?page=${page}&size=${size}`),
  getRecommended: (page = 0, size = 10) =>
    ApiClient.get<any[]>(`/api/search/recommended?page=${page}&size=${size}`),
}

// -------------------------------------------------------------
// READING PROGRESS
// -------------------------------------------------------------
export const progressApi = {
  getDocumentProgress: (documentId: number) =>
    ApiClient.get<any>(`/api/reading-progress/document/${documentId}`),

  updateProgress: (documentId: number, data: any) =>
    ApiClient.post<any>(`/api/reading-progress/document/${documentId}`, data),

  getCompleted: () => ApiClient.get<any[]>("/api/reading-progress/completed"),
  getInProgress: () => ApiClient.get<any[]>("/api/reading-progress/in-progress"),
  getRecent: () => ApiClient.get<any[]>("/api/reading-progress/recent"),

  reset: (documentId: number) =>
    ApiClient.delete<void>(`/api/reading-progress/document/${documentId}`),
}

// -------------------------------------------------------------
// ROLES
// -------------------------------------------------------------
export const rolesApi = {
  getAll: () => ApiClient.get<any[]>("/api/roles"),
  getById: (id: number) => ApiClient.get<any>(`/api/roles/${id}`),
  create: (role: any) => ApiClient.post<any>("/api/roles", role),
  update: (id: number, role: any) => ApiClient.put<any>(`/api/roles/${id}`, role),
  delete: (id: number) => ApiClient.delete<void>(`/api/roles/${id}`),
  getUsersByRole: (id: number) => ApiClient.get<any[]>(`/api/roles/${id}/users`),
}

// -------------------------------------------------------------
// LOCATIONS
// -------------------------------------------------------------
export const locationsApi = {
  getAll: () => ApiClient.get<any[]>("/api/locations"),
  getById: (id: number) => ApiClient.get<any>(`/api/locations/${id}`),
  create: (location: any) => ApiClient.post<any>("/api/locations", location),
  update: (id: number, location: any) => ApiClient.put<any>(`/api/locations/${id}`, location),
  delete: (id: number) => ApiClient.delete<void>(`/api/locations/${id}`),

  getByCity: (city: string) => ApiClient.get<any[]>(`/api/locations/by-city/${city}`),
  getByState: (state: string) => ApiClient.get<any[]>(`/api/locations/by-state/${state}`),

  assignCoordinator: (locationId: number, userId: number) =>
    ApiClient.put<any>(`/api/locations/${locationId}/coordinator/${userId}`, {}),

  getUsers: (id: number) => ApiClient.get<any[]>(`/api/locations/${id}/users`),
}

// -------------------------------------------------------------
// STAGES
// -------------------------------------------------------------
export const stagesApi = {
  getAll: () => ApiClient.get<any[]>("/api/stages"),
  getById: (id: number) => ApiClient.get<any>(`/api/stages/${id}`),
  getByUser: (userId: number) => ApiClient.get<any[]>(`/api/stages/user/${userId}`),

  create: (userId: number, stage: any) =>
    ApiClient.post<any>(`/api/stages/user/${userId}`, stage),

  update: (id: number, stage: any) =>
    ApiClient.put<any>(`/api/stages/${id}`, stage),

  delete: (id: number) => ApiClient.delete<void>(`/api/stages/${id}`),

  complete: (id: number) => ApiClient.put<any>(`/api/stages/${id}/complete`, {}),

  getActive: () => ApiClient.get<any[]>("/api/stages/active"),
}

// -------------------------------------------------------------
// CATEGORIES
// -------------------------------------------------------------
export const categoriesApi = {
  getAll: () => ApiClient.get<any[]>("/api/categories"),
  getRoot: () => ApiClient.get<any[]>("/api/categories/root"),
  getById: (id: number) => ApiClient.get<any>(`/api/categories/${id}`),
  getSubcategories: (id: number) =>
    ApiClient.get<any[]>(`/api/categories/${id}/subcategories`),

  create: (category: any) => ApiClient.post<any>("/api/categories", category),
  update: (id: number, category: any) =>
    ApiClient.put<any>(`/api/categories/${id}`, category),
  delete: (id: number) => ApiClient.delete<void>(`/api/categories/${id}`),
}
