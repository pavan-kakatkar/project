const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

if (!baseUrl) {
  throw new Error('VITE_API_BASE_URL is missing. Add it to the project .env file and restart Vite.')
}

export const API_BASE_URL = baseUrl
export const AUTH_API_PATH = import.meta.env.VITE_AUTH_API_PATH || '/api/auth'
export const PRODUCTS_API_PATH = import.meta.env.VITE_PRODUCTS_API_PATH || '/api/products'

/** Build an absolute gateway URL for a route or API path. */
export function apiUrl(path = '') {
  return `${API_BASE_URL}/${path.replace(/^\//, '')}`
}

/** Fetch JSON from the gateway and surface backend error messages. */
export async function apiRequest(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  const responseText = await response.text()
  let data = null

  if (responseText) {
    try {
      data = JSON.parse(responseText)
    } catch {
      data = responseText
    }
  }

  if (!response.ok) {
    const message = typeof data === 'object' && data !== null
      ? data.message || data.error
      : data
    throw new Error(message || `Request failed (${response.status})`)
  }

  return data
}
