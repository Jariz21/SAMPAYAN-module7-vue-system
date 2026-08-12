<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['editingStudent'])
const emit = defineEmits(['save-student', 'cancel-edit'])

const form = ref({ studentNumber: '', name: '', program: '', yearLevel: '' })
const errorMsg = ref('')

watch(() => props.editingStudent, (newVal) => {
  if (newVal) {
    form.value = { ...newVal }
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  form.value = { studentNumber: '', name: '', program: '', yearLevel: '' }
  errorMsg.value = ''
}

function handleSubmit() {
  if (!form.value.studentNumber || !form.value.name || !form.value.program || !form.value.yearLevel) {
    errorMsg.value = 'All fields are required.'
    return
  }
  errorMsg.value = ''
  emit('save-student', { ...form.value })
  resetForm()
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
    <h2 class="text-xl font-bold mb-4 text-gray-800">{{ editingStudent ? 'Edit Student Record' : 'Add New Student Record' }}</h2>
    <p v-if="errorMsg" class="text-red-500 text-sm mb-4 font-medium">{{ errorMsg }}</p>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input v-model="form.studentNumber" type="text" placeholder="Student Number (e.g., 2026-0001)" class="border p-2 rounded w-full focus:outline-blue-500" />
      <input v-model="form.name" type="text" placeholder="Full Name" class="border p-2 rounded w-full focus:outline-blue-500" />
      <input v-model="form.program" type="text" placeholder="Program (e.g., BSCS)" class="border p-2 rounded w-full focus:outline-blue-500" />
      <select v-model="form.yearLevel" class="border p-2 rounded w-full focus:outline-blue-500">
        <option value="" disabled>Select Year Level</option>
        <option value="1st Year">1st Year</option>
        <option value="2nd Year">2nd Year</option>
        <option value="3rd Year">3rd Year</option>
        <option value="4th Year">4th Year</option>
      </select>
      <div class="md:col-span-2 flex gap-2">
        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded cursor-pointer transition">
          {{ editingStudent ? 'Update Record' : 'Add Record' }}
        </button>
        <button v-if="editingStudent" type="button" @click="emit('cancel-edit')" class="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded cursor-pointer transition">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>