import { ref } from "vue";
import { defineStore } from "pinia";

export const useRegisterModalStore = defineStore("showRegister", () => {
  const showRegister = ref(false);

  const toggleRegister = () => {
    showRegister.value = !showRegister.value;
  };

  return {
    showRegister,
    toggleRegister,
  };
});
