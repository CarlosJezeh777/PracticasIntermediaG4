<template>
  <div
    class="bg-slate-500 m-2 h-full border border-black flex flex-col items-center justify-center"
  >
    <h1 class="text-white">{{ images }}</h1>
    <img
      :src="images"
      alt="img.png"
      class="w-3/4 h-3/4 max-w-full max-h-full object-contain"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const images = ref("");

onMounted(() => {
  console.log("ImageComponent mounted");
});
</script>

<style scoped></style>
