<template>
  <div
    class="bg-slate-500 m-2 h-full border border-black flex flex-col items-center justify-center"
  >
    <h1 class="text-white">{{ useImages.currentImage.name }}</h1>
    <img
      v-if="useImages.getLibrary() === 'pokeapi'"
      :src="useImages.currentImage.getFile('front_default')"
      alt="img.png"
      class="w-3/4 h-3/4 max-w-full max-h-full object-contain"
    />
    <img
      v-else-if="useImages.getLibrary() === utilsStore.name1"
      :src="useImages.currentImage.getFile('url')"
      alt="image.png"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { appStore } from "../../stores";
import { useImagesStore } from "../../stores/images";
import { useUtilsStore } from "../../stores/utils";
const useImages = useImagesStore(appStore);
const utilsStore = useUtilsStore(appStore);

onMounted(() => {
  console.log("ImageComponent mounted");
  console.log(useImages.currentImage);
});
</script>

<style scoped></style>
