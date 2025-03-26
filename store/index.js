import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    token: null,
  }),
  getters: {},
  actions: {
    setToken(payload) {
      this.token = payload;
    },
  },
});
