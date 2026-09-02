<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import AppFooter from './components/AppFooter.vue'

const records = ref([])
const searchTerm = ref('')
const selectedStatus = ref('All')
const editingStudent = ref(null)

// Banner messages
const successMsg = ref('')
const errorMsg = ref('')

const defaultRecords = [
  { id: 1, studentNumber: '2023-0001', name: 'Jariz Jane G. Sampayan', program: 'BSIT', yearLevel: '3rd Year', status: 'Active' },
  { id: 2, studentNumber: '2023-0002', name: 'John Lloyd E. Saban', program: 'BSCS', yearLevel: '3rd Year', status: 'Inactive' },
  { id: 3, studentNumber: '2023-0003', name: 'Kristian Dale D. David', program: 'BSIS', yearLevel: '3rd Year', status: 'Active' }
]

onMounted(() => {
  const saved = localStorage.getItem('module7-records')
  if (saved) {
    records.value = JSON.parse(saved)
  } else {
    records.value = defaultRecords
    saveToStorage()
  }
})

function saveToStorage() {
  localStorage.setItem('module7-records', JSON.stringify(records.value))
}

function showSuccess(msg) {
  errorMsg.value = ''
  successMsg.value = msg
  setTimeout(() => { successMsg.value = '' }, 4000)
}

function showError(msg) {
  successMsg.value = ''
  errorMsg.value = msg
  setTimeout(() => { errorMsg.value = '' }, 4000)
}

function handleSave(studentData) {
  const inputNo = (studentData.studentNumber || studentData.studentNo || '').trim()

  if (editingStudent.value) {
    // Check if updating to a student number that belongs to ANOTHER record
    const duplicate = records.value.find(
      r => (r.studentNumber || r.studentNo) === inputNo && r.id !== editingStudent.value.id
    )

    if (duplicate) {
      showError(`Record failed: Student number "${inputNo}" is already assigned to another student!`)
      return
    }

    const index = records.value.findIndex(r => r.id === editingStudent.value.id)
    if (index !== -1) {
      records.value[index] = { 
        ...studentData, 
        studentNumber: inputNo,
        id: editingStudent.value.id,
        status: studentData.status || records.value[index].status || 'Active' 
      }
    }
    editingStudent.value = null
    showSuccess('Student record updated successfully!')
  } else {
    // Check for existing duplicate student number on new entry
    const exists = records.value.some(
      r => (r.studentNumber || r.studentNo) === inputNo
    )

    if (exists) {
      showError(`Record failed: A student with number "${inputNo}" already exists in the system!`)
      return
    }

    records.value.push({ 
      id: Date.now(), 
      ...studentData,
      studentNumber: inputNo,
      status: studentData.status || 'Active' 
    })
    showSuccess('New student record added successfully!')
  }
  
  saveToStorage()
}

function handleEdit(student) {
  errorMsg.value = ''
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
  return records.value.filter(r => {
    const num = (r.studentNumber || r.studentNo || '').toLowerCase()
    const name = (r.name || '').toLowerCase()
    const matchesSearch = name.includes(term) || num.includes(term)
    const matchesStatus = selectedStatus.value === 'All' || r.status === selectedStatus.value
    return matchesSearch && matchesStatus
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-between">
    <div>
      <AppHeader />
      <main class="container mx-auto px-4 max-w-5xl py-6">
        
        <!-- Success Banner -->
        <div 
          v-if="successMsg" 
          class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md font-medium transition"
        >
          {{ successMsg }}
        </div>

        <!-- Duplicate Warning / Error Banner -->
        <div 
          v-if="errorMsg" 
          class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md font-medium transition"
        >
          ⚠️ {{ errorMsg }}
        </div>

        <RecordForm 
          :editingStudent="editingStudent" 
          @save-student="handleSave" 
          @cancel-edit="editingStudent = null" 
        />
        
        <RecordList 
          :students="filteredRecords" 
          v-model:searchTerm="searchTerm" 
          v-model:selectedStatus="selectedStatus"
          @edit-student="handleEdit" 
          @delete-student="handleDelete" 
        />
      </main>
    </div>
    <AppFooter />
  </div>
</template>