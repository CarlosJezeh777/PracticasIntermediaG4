<template>
  <PokedexComponent v-if="useImages.getLibrary() == 'pokeapi'" />
</template>

<script setup lang="ts">
import PokedexComponent from '@/components/PokedexComponent.vue'
import { useImagesStore } from '@/stores/images'
import { onMounted } from 'vue'
const useImages = useImagesStore()
onMounted(() => {
  console.log("LibraryView mounted");
})
</script>
<style scoped></style>
