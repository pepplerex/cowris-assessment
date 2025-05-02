<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <form
      @submit.prevent="login"
      class="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm flex flex-col gap-4"
    >
      <h2 class="text-2xl font-semibold text-center text-gray-800">Login</h2>

      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <button
        type="submit"
        class="bg-[#000000] hover:bg-primary-700 text-white font-medium py-2 rounded-lg transition duration-200"
      >
        Login
      </button>

      <router-link to="/register" class="text-center text-sm text-primary-600 hover:underline">
        Create an account
      </router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";

const auth = useAuthStore();
const email = ref("");
const password = ref("");

// Handle login
const login = () => auth.login(email.value, password.value);
</script>
