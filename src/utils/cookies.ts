// src/utils/cookies.ts
export const clearAllCookies = () => {
  const cookies = document.cookie.split(';')
  const domain = window.location.hostname

  cookies.forEach((cookie) => {
    const [name] = cookie.split('=')
    document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`
  })
}
