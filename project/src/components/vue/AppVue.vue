<template>
  <header class="bg-slate-600 m-2 p-1">
    <nav class="flex items-center justify-between flex-wrap p-3">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/">
          <span class="font-semibold text-xl tracking-tight"
            >Image<strong>S</strong></span
          >
        </a>
      </div>
      <div class="block lg:hidden">
        <button
          @click="toggleMenu()"
          class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-400 hover:border-gray-400"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 5h20v2H0V8zm0 5h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
        class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
      >
        <div class="text-sm lg:flex-grow">
          <a
            href="/vue/home"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
            >Home</a
          >
          <a
            href="/vue/library"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
            >Library</a
          >
          <a
            href="/vue/image"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
            >Image</a
          >
          <a
            href="/vue/profile"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400"
            >Profile</a
          >
        </div>

        <div>
          <button
            @click="toggleLogin()"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
          >
            Login
          </button>
          <button
            @click="toggleRegister()"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  </header>
  <ModalComponent :show="showLoginModal" @close="toggleLogin()">
    <LoginComponent @change="change()" />
  </ModalComponent>

  <ModalComponent :show="showRegisterModal" @close="toggleRegister()">
    <RegisterComponent @change="change()" />
  </ModalComponent>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import ModalComponent from "../vue/ModalComponent.vue";
import LoginComponent from "../vue/LoginComponent.vue";
import RegisterComponent from "../vue/RegisterComponent.vue";

const isMenuOpen = ref(false);
const showLoginModal = ref(false);
const showRegisterModal = ref(false);

const toggleLogin = () => {
  showLoginModal.value = !showLoginModal.value;
};

const toggleRegister = () => {
  showRegisterModal.value = !showRegisterModal.value;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const change = () => {
  showLoginModal.value = !showLoginModal.value;
  showRegisterModal.value = !showRegisterModal.value;
};

onMounted(async () => {
  console.log("AppVue mounted");
  // console.log(props);
});
</script>

<style scoped></style>
