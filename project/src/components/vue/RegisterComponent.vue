<template>
  <div>
    <h2 class="text-xl mb-4">Register</h2>
    <form method="POST" action="/api/register">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username"
          >Username</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="username"
          name="username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
          >Email</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password"
          >Password</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
          id="password"
          name="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          @click="changeToRegister"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["change"]);

const changeToRegister = () => {
  emits("change");
};
</script>

<style scoped></style>
