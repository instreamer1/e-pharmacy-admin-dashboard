import type { NormalizedError } from "../../utils/normalizeError"

export interface User {
  name: string
  email: string
  role: string
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  isLoggedIn: boolean
  isRefreshing: boolean
  isLoading: boolean
  error: NormalizedError | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface UserResponse {
  user: User
  accessToken: string
}