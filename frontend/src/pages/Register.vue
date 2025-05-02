<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <form
      @submit.prevent="register"
      class="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm flex flex-col gap-4"
    >
      <h2 class="text-2xl font-semibold text-center text-gray-800">Create Account</h2>

      <input
        v-model="name"
        type="text"
        placeholder="Name"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      />

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      />

      <button
        type="submit"
        class="bg-[#000000] hover:bg-primary-700 text-white font-medium py-2 rounded-lg transition duration-200"
      >
        Register
      </button>

      <router-link to="/login" class="text-center text-sm text-primary-600 hover:underline">
        Already have an account? Login
      </router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";

const auth = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");

const register = () => auth.register(name.value, email.value, password.value);
</script>
