<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">All Users</h2>

    <ul class="space-y-4">
      <li
        v-for="user in users"
        :key="user.id"
        class="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 border border-gray-200"
      >
        <div>
          <p class="font-medium text-gray-900">{{ user.name }}</p>
          <p class="text-sm text-gray-600">{{ user.email }}</p>
        </div>
        <div class="flex gap-2">
          <button
            @click="editUser(user)"
            class="px-3 py-1 text-sm bg-[#000000] text-white rounded-md hover:bg-[#000000] transition"
          >
            Edit
          </button>
          <button
            @click="deleteUser(user.id)"
            class="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <div v-if="editing" class="mt-6 bg-gray-50 border border-gray-200 p-4 rounded-lg">
      <h3 class="text-lg font-medium mb-3 text-gray-800">Edit User</h3>
      <div class="flex flex-col gap-3">
        <input
          v-model="editing.name"
          placeholder="Name"
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="editing.email"
          placeholder="Email"
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="saveEdit"
          class="self-start px-4 py-2 bg-[#000000] text-white rounded-md hover:bg-[#000000] transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "@/api/axios";
import type { User } from "@/types/User";

const users = ref<User[]>([]);
const editing = ref<User | null>(null);

const fetchUsers = async () => {
  const res = await api.get("/users");
  users.value = res.data;
};

const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
  fetchUsers();
};

const editUser = (user: User) => {
  editing.value = { ...user };
};

const saveEdit = async () => {
  if (editing.value) {
    await api.put(`/users/${editing.value.id}`, editing.value);
    editing.value = null;
    fetchUsers();
  }
};

onMounted(fetchUsers);
</script>
