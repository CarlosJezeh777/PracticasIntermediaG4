<template>
  <div
    v-if="props.show"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
  >
    <div class="bg-white p-4 rounded shadow-lg w-full max-w-md">
      <slot></slot>
      <button
        @click="close()"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["show"]);

const emits = defineEmits(["close"]);

const close = () => {
  emits("close");
};
</script>

<style scoped>
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
