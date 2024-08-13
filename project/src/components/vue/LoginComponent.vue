<template>
  <div>
    <h2 class="text-xl mb-4">Login</h2>
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username"
          >Username</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password"
          >Password</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          @click="changeToRegister"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { appStore } from "../../stores";
import { useLoginModalStore } from "../../stores/showLogin";
import { useRegisterModalStore } from "../../stores/showRegister";

const showLoginModal = useLoginModalStore(appStore);
const showRegisterModal = useRegisterModalStore(appStore);

const changeToRegister = () => {
  showLoginModal.toggleLogin();
  showRegisterModal.toggleRegister();
};
</script>

<style scoped></style>
