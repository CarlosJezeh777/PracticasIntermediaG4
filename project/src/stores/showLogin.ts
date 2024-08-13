import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoginModalStore = defineStore("showLogin", () => {
  const showLogin = ref(false);

  const toggleLogin = () => {
    showLogin.value = !showLogin.value;
    console.log("login value: ",showLogin.value);
  };

  return {
    showLogin,
    toggleLogin,
  };
});
