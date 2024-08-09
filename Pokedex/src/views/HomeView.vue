<template>
  <div class="m-2 bg-slate-400 p-4">
    <!-- <h1>{{ contador.count }}</h1>
    <button @click="contador.increment()" class="px-2 py-1 bg-blue-500 text-white rounded">
      +
    </button>
    <button @click="contador.decrement()" class="px-2 py-1 bg-red-500 text-white rounded ml-2">
      -
    </button> -->

    <!-- <h1 class="mt-4">{{ images.images.size }}</h1> -->

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <div v-for="(card, index) in cards" :key="index" class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-bold mb-2">{{ card.name }}</h2>
        <p>{{ card.description }}</p>
        <button
          @click="executeMethod(card.method)"
          class="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Ejecutar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUtilsStore } from '@/stores/utils'

const router = useRouter()
const utilsStore = useUtilsStore()

const cards = ref([
  {
    name: 'POKEAPI',
    description: 'Posibilidad de buscar nombres de pokemones y ver las imagenes de los encontrado',
    method: 'methodTwo'
  }
])

const executeMethod = (method: string) => {
  if (method === 'methodOne') {
    methodOne()
  } else if (method === 'methodTwo') {
    methodTwo()
  } else if (method === 'methodThird') {
    methodThird()
  }
  router.push({ name: 'library' })
}

const methodOne = () => {
  utilsStore.changeBaseUrl(1)
}

const methodTwo = () => {
  utilsStore.changeBaseUrl(2)
}

const methodThird = () => {
  utilsStore.changeBaseUrl(3)
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí */
</style>
