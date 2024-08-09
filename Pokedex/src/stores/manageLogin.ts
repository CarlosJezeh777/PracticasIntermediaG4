import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useServicesStore } from './services'

export const useLoginStore = defineStore('manageLogin', () => {
  const services = useServicesStore()
  const isLogged = ref(false)

  const login = async (user: string, password: string) => {
    const endPoint = 'login'
    const body = { usuario: user, contrasenia: password }
    const response = await services.postData(endPoint, body)

    if (response?.message === 'success') {
      isLogged.value = true
      return {
        message: 'success',
        name: response.user
      }
    } else {
      isLogged.value = false
      return {
        message: 'error',
        name: ''
      }
    }
  }

  return { isLogged, login }
})
