const USERS_KEY = 'sunday-scoops-users'

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

export function registerUser({ name, username, password }) {
  const normalizedUsername = username.trim().toLowerCase()
  const users = getUsers()

  if (users.some((user) => user.username === normalizedUsername)) {
    throw new Error('An account already exists for that username or email.')
  }

  users.push({ name: name.trim(), username: normalizedUsername, password })
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function validateUser(username, password) {
  const normalizedUsername = username.trim().toLowerCase()
  return getUsers().some((user) => user.username === normalizedUsername && user.password === password)
}
