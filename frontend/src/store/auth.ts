import { defineStore } from "pinia";
import api from "@/api/axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: null as any,
  }),
  actions: {
    async login(email: string, password: string) {
      await api
        .post("/users/login", { email, password })
        .then((res) => {
          this.token = res.data.token;
          localStorage.setItem("token", this.token);
          router.push("/users");
        })
        .catch((err) => {
          console.log(err);

          alert(err.response.data.message);
        });
    },
    async register(name: string, email: string, password: string) {
      await api.post("/users", { name, email, password });
      await this.login(email, password);
    },
    logout() {
      this.token = "";
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
});
