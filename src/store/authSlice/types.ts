import type { NormalizedError } from '../../utils/normalizeError'
import type { Role } from '../../constants/roles'

export interface User {
  name?: string
  email?: string
  roles: Role[];
}

export interface AuthState {
  user: User | null

  isAuthenticated: boolean
  isRefreshing: boolean
  isLoading: boolean
  error: NormalizedError | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface UserResponse {
  accessToken: string
  roles: Role
}
