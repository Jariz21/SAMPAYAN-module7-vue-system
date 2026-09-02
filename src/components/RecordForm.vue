<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editingStudent: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save-student', 'cancel-edit'])

const studentNumber = ref('')
const name = ref('')
const program = ref('')
const yearLevel = ref('')
const status = ref('Active')

// Populate form when Edit is clicked
watch(() => props.editingStudent, (newVal) => {
  if (newVal) {
    studentNumber.value = newVal.studentNumber || newVal.studentNo || ''
    name.value = newVal.name || ''
    program.value = newVal.program || ''
    yearLevel.value = newVal.yearLevel || ''
    status.value = newVal.status || 'Active'
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  studentNumber.value = ''
  name.value = ''
  program.value = ''
  yearLevel.value = ''
  status.value = 'Active'
}

function handleSubmit() {
  emit('save-student', {
    studentNumber: studentNumber.value,
    name: name.value,
    program: program.value,
    yearLevel: yearLevel.value,
    status: status.value
  })
  resetForm()
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow border border-gray-200 mb-6">
    <h2 class="text-lg font-bold mb-4">
      {{ props.editingStudent ? 'Edit Student Record' : 'Add New Student Record' }}
    </h2>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-4">
      <input v-model="studentNumber" type="text" placeholder="Student Number (e.g., 2026-0001)" class="border p-2 rounded" required />
      <input v-model="name" type="text" placeholder="Full Name" class="border p-2 rounded" required />
      <input v-model="program" type="text" placeholder="Program (e.g., BSCS)" class="border p-2 rounded" required />
      
      <select v-model="yearLevel" class="border p-2 rounded">
        <option value="">Select Year Level</option>
        <option value="1st Year">1st Year</option>
        <option value="2nd Year">2nd Year</option>
        <option value="3rd Year">3rd Year</option>
        <option value="4th Year">4th Year</option>
      </select>

      <!-- Status Dropdown for Form -->
      <select v-model="status" class="border p-2 rounded">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <!-- Smaller, Auto-Sized Button -->
      <div class="col-span-2 flex justify-start gap-2 pt-2">
        <button 
          type="submit" 
          class="px-5 py-2 bg-blue-600 text-white rounded-md font-medium text-sm hover:bg-blue-700 transition"
        >
          {{ props.editingStudent ? 'Update Record' : 'Add Record' }}
        </button>
        <button 
          v-if="props.editingStudent" 
          @click="emit('cancel-edit')" 
          type="button" 
          class="px-4 py-2 bg-gray-500 text-white rounded-md font-medium text-sm hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>