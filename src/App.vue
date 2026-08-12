<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import AppFooter from './components/AppFooter.vue'

const records = ref([])
const searchTerm = ref('')
const editingStudent = ref(null)
const successMsg = ref('')

onMounted(() => {
  const saved = localStorage.getItem('module7-records')
  records.value = saved ? JSON.parse(saved) : []
})

function saveToStorage() {
  localStorage.setItem('module7-records', JSON.stringify(records.value))
}

function showSuccess(msg) {
  successMsg.value = msg
  setTimeout(() => {
    successMsg.value = ''
  }, 4000)
}

function handleSave(studentData) {
  if (editingStudent.value) {
    const index = records.value.findIndex(r => r.id === editingStudent.value.id)
    if (index !== -1) records.value[index] = { ...studentData, id: editingStudent.value.id }
    editingStudent.value = null
    showSuccess('Student record updated successfully!')
  } else {
    records.value.push({ id: Date.now(), ...studentData })
    showSuccess('New student record added successfully!')
  }
  saveToStorage()
}

function handleEdit(student) {
  editingStudent.value = student
}

function handleDelete(id) {
  if (window.confirm('Are you sure you want to delete this student record?')) {
    records.value = records.value.filter(r => r.id !== id)
    saveToStorage()
    showSuccess('Student record deleted successfully!')
  }
}

const filteredRecords = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  return records.value.filter(r => 
    r.name.toLowerCase().includes(term) || 
    r.studentNumber.toLowerCase().includes(term)
  )
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-between">
    <div>
      <AppHeader />
      <main class="container mx-auto px-4 max-w-5xl">
        <!-- Banner Message -->
        <div 
          v-if="successMsg" 
          class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md font-medium transition"
        >
          {{ successMsg }}
        </div>

        <RecordForm 
          :editingStudent="editingStudent" 
          @save-student="handleSave" 
          @cancel-edit="editingStudent = null" 
        />
        <RecordList 
          :students="filteredRecords" 
          v-model:searchTerm="searchTerm" 
          @edit-student="handleEdit" 
          @delete-student="handleDelete" 
        />
      </main>
    </div>
    <AppFooter />
  </div>
</template><!-- LocalStorage persistence ready -->
