import { reactive } from "vue";

export const testStore = reactive({
  count: 0,
  increment() {
    this.count++;
  },
  decrement() {
    this.count--;
  },
});
