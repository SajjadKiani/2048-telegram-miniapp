export const fetchUser = async (telegramId) => {
    try {
      const response = await fetch('/api/users/' + telegramId)
      if (response.status === '200')
        return await response.json()
      else (response.status === '404')
        return undefined
    } catch (e) {
      console.log(e);
    }
  }

export const createUser = async (data) => {
    try {
      const response = await fetch('/api/users/', data, {method: 'POST'})
      if (response.status === '200')
        return await response.json()
    } catch (e) {
      console.log(e);
    }
  }

  export const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/')
      return await response.json()
    } catch (e) {
      console.log(e);
    }
  }