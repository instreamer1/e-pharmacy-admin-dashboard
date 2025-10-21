// utils/TokenStorage.ts
class TokenStorage {
  private token: string | null = null
  
  setToken(token: string): void {
    this.token = token
  }
  
  getToken(): string | null {
    return this.token
  }
  
  clearToken(): void {
    this.token = null
  }
  
  hasToken(): boolean {
    return this.token !== null
  }
}


export const tokenStorage = new TokenStorage()

// let memoryToken: string | null = null

// export const tokenStorage = {
//   // ✅ Сохранить токен в памяти
//   setToken: (token: string): void => {
//     memoryToken = token
//   },
  
//   // ✅ Получить токен из памяти
//   getToken: (): string | null => {
//     return memoryToken
//   },
  
//   // ✅ Очистить токен из памяти
//   clearToken: (): void => {
//     memoryToken = null
//   },
  
//   // ✅ Проверить наличие токена
//   hasToken: (): boolean => {
//     return memoryToken !== null
//   }
// }