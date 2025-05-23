import axios from "axios"

const base_Url = '/api'

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
  instance.post('users/get/' + data.id, data)    

export const createAd = async (data) => 
  instance.post('users/get/' + data.id, data)    
  