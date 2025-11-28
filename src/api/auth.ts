import { clearToken, getToken } from "./api"

export interface User {
  id: number
  username: string
  name: string
  role: string
  lifeStage?: string
  missionLocationId?: number
  missionLocationName?: string
}

export function setUser(user: User) {
  localStorage.setItem("user_data", JSON.stringify(user))
}

export function getUser(): User | null {
  const userData = localStorage.getItem("user_data")
  return userData ? JSON.parse(userData) : null
}

export function logout() {
  clearToken()
  window.location.href = "/login"
}

export function isAuthenticated(): boolean {
  return !!getToken()
}
