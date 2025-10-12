import type { NormalizedError } from "../../utils/normalizeError"
import type { Role } from '../../constants/roles';

export interface User {
  name: string
  email: string
  role: Role
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
  role: string
  accessToken: string
}