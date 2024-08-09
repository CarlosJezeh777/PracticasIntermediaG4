import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', () => {
  const postData = async (
    endPoint: string,
    cuerpo: object,
    url: string = 'http://localhost:3000/',
    options: object = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: cuerpo
    }
  ) => {
    const response = await fetch(url + endPoint, options)
    return response.json()
  }

  const getData = async (endPoint: string, options: object = {}) => {
    try {
      const response = await fetch(endPoint, options)
      return response.json()
    } catch (error) {
      console.error(error)
    }
  }

  return { postData, getData }
})
