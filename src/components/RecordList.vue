<script setup>
defineProps(['students', 'searchTerm'])
const emit = defineEmits(['update:searchTerm', 'edit-student', 'delete-student'])
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <input 
        :value="searchTerm" 
        @input="emit('update:searchTerm', $event.target.value)" 
        type="text" 
        placeholder="Search by student name or number..." 
        class="border p-2 rounded w-full md:w-1/3 focus:outline-blue-500" 
      />
      <span class="text-sm font-semibold text-gray-600">Total Records: {{ students.length }}</span>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100 border-b text-gray-700">
            <th class="p-3">Student No.</th>
            <th class="p-3">Name</th>
            <th class="p-3">Program</th>
            <th class="p-3">Year Level</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in students" :key="s.id" class="border-b hover:bg-gray-50 transition">
            <td class="p-3 font-medium text-gray-900">{{ s.studentNumber }}</td>
            <td class="p-3">{{ s.name }}</td>
            <td class="p-3">{{ s.program }}</td>
            <td class="p-3">{{ s.yearLevel }}</td>
            <td class="p-3 text-center space-x-2">
              <button @click="emit('edit-student', s)" class="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm cursor-pointer transition">Edit</button>
              <button @click="emit('delete-student', s.id)" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm cursor-pointer transition">Delete</button>
            </td>
          </tr>
          <tr v-if="students.length === 0">
            <td colspan="5" class="p-4 text-center text-gray-500">No records found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>