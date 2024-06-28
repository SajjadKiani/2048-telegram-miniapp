export const fetchUser = async (telegramId) => {
    try {
      const response = await fetch('/api/users/get/' + telegramId)
      if (response.status === '200')
        return await response.json()
      else (response.status === '404')
        return []
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

  export const fetchTopReferrals = async () => {
    try {
      const response = await fetch('/api/users/top-refferals')
      return await response.json()
    } catch (e) {
      console.log(e);
    }
  }

  export const updateUser = async (data) => {
    try {
      const response = await fetch('/api/users/get/' + data.telegramId, data, {method: 'POST'})
      if (response.status === '200')
        return await response.json()
    } catch (e) {
      console.log(e);
    }
  }