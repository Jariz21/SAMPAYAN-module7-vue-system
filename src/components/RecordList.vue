<script setup>
defineProps({
  students: {
    type: Array,
    required: true
  },
  searchTerm: {
    type: String,
    default: ''
  },
  selectedStatus: {
    type: String,
    default: 'All'
  }
})

defineEmits(['update:searchTerm', 'update:selectedStatus', 'edit-student', 'delete-student'])
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow border border-gray-200">
    <!-- Controls -->
    <div class="flex gap-4 mb-4">
      <input 
        :value="searchTerm" 
        @input="$emit('update:searchTerm', $event.target.value)" 
        type="text" 
        placeholder="Search students by name or ID..." 
        class="flex-1 border p-2 rounded"
      />
      <select 
        :value="selectedStatus" 
        @change="$emit('update:selectedStatus', $event.target.value)" 
        class="border p-2 rounded"
      >
        <option value="All">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>

    <!-- Data Table -->
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2 text-left">Student No</th>
          <th class="border p-2 text-left">Name</th>
          <th class="border p-2 text-left">Program</th>
          <th class="border p-2 text-left">Year Level</th>
          <th class="border p-2 text-left">Status</th>
          <th class="border p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50">
          <td class="border p-2">{{ student.studentNumber || student.studentNo }}</td>
          <td class="border p-2">{{ student.name }}</td>
          <td class="border p-2">{{ student.program }}</td>
          <td class="border p-2">{{ student.yearLevel || 'N/A' }}</td>
          <td class="border p-2 font-semibold" :class="student.status === 'Inactive' ? 'text-red-600' : 'text-green-600'">
            {{ student.status || 'Active' }}
          </td>
          <td class="border p-2 text-center space-x-2">
            <button @click="$emit('edit-student', student)" class="px-2 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600">Edit</button>
            <button @click="$emit('delete-student', student.id)" class="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">Delete</button>
          </td>
        </tr>
        <tr v-if="students.length === 0">
          <td colspan="6" class="border p-4 text-center text-gray-500">No student records found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>