import axios from "axios"

const base_Url = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL + '/api' : 'http://localhost:3000/api'

const instance = axios.create({
  baseURL: base_Url
})

export const fetchUser = (telegramId) => 
  instance.get('users/get/' + telegramId)

export const createUser = (data) => 
  instance.post('users', data)

export const fetchUsers = () => 
  instance.get('users')

export const fetchTopReferrals =() => 
  instance.get('users/top-referrals')

export const updateUser = async (data) => 
  instance.post('users/get/' + data.telegramId, data)    
  