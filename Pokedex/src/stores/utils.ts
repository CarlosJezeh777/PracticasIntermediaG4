import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useServicesStore } from './services'

export const useUtilsStore = defineStore('utils', () => {
  const services = useServicesStore()
  const isDark = ref(false)

  const name1 = import.meta.env.VITE_NAME1

  const baseConfig = ref({
    name: 'pokedex',
    baseUrl: 'https://pokeapi.co/api/v2/pokemon',
    options: {
      user: '',
      apiKey: ''
    }
  })

  const changeBaseUrl = (option: number) => {
    if (option == 1) {
      baseConfig.value.name = import.meta.env.VITE_NAME1
      baseConfig.value.baseUrl = import.meta.env.VITE_URL1
      baseConfig.value.options.user = import.meta.env.VITE_USER_NAME
      baseConfig.value.options.apiKey = import.meta.env.VITE_API_KEY
    } else if (option == 2) {
      baseConfig.value.name = import.meta.env.VITE_NAME2
      baseConfig.value.baseUrl = import.meta.env.VITE_URL2
      console.log(baseConfig.value);
    } else if (option == 3) {
      baseConfig.value.name = import.meta.env.VITE_NAME3
      baseConfig.value.baseUrl = import.meta.env.VITE_URL3
    }
  }

  
  const getImagesFromPokeAPI = async (id: string, limit: number = 20, offset: number = 0) => {
    const url = baseConfig.value.baseUrl + `${id}/?limit=${limit}&offset=${offset}`

    const response = await services.getData(url)

    return response
  }

  return { isDark, getImagesFromPokeAPI, baseConfig, changeBaseUrl, name1 }
})
