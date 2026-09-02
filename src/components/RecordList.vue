<script setup>
import { ref, computed } from 'vue'
import { filterRecords } from '../utils/filterRecords'

const searchQuery = ref('')
const selectedStatus = ref('All')

const students = ref([
  { id: 1, studentNo: '2023-0001', name: 'Jariz Jane G. Sampayan', program: 'BSIT', status: 'Active' },
  { id: 2, studentNo: '2023-0002', name: 'John Lloyd E. Saban', program: 'BSCS', status: 'Inactive' },
  { id: 3, studentNo: '2023-0003', name: 'Kristian David', program: 'BSIS', status: 'Active' }
])

const filteredStudents = computed(() => {
  return filterRecords(students.value, searchQuery.value, selectedStatus.value)
})
</script>

<template>
  <div class="p-4">
    <!-- Controls Layout -->
    <div class="flex gap-4 mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search students..."
        class="border p-2 rounded flex-1"
      />
      
      <!-- Module 9 Status Filter Dropdown -->
      <select v-model="selectedStatus" class="border p-2 rounded">
        <option value="All">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>

    <!-- Student Table -->
    <table class="w-full text-left border-collapse border">
      <thead>
        <tr class="bg-gray-100 border-b">
          <th class="p-2 border">Student No</th>
          <th class="p-2 border">Name</th>
          <th class="p-2 border">Program</th>
          <th class="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in filteredStudents" :key="student.id" class="border-b">
          <td class="p-2 border">{{ student.studentNo }}</td>
          <td class="p-2 border">{{ student.name }}</td>
          <td class="p-2 border">{{ student.program }}</td>
          <td class="p-2 border">
            <span :class="student.status === 'Active' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
              {{ student.status || 'Active' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>