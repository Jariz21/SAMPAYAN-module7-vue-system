<script setup>
import { ref, computed } from 'vue'
import { filterRecords } from '../utils/filterRecords'

const searchQuery = ref('')
const selectedStatus = ref('All')

// Form inputs
const studentNo = ref('')
const name = ref('')
const program = ref('')
const yearLevel = ref('')

const students = ref([
  { id: 1, studentNo: '2023-0001', name: 'Jariz Jane G. Sampayan', program: 'BSIT', status: 'Active' },
  { id: 2, studentNo: '2023-0002', name: 'John Lloyd E. Saban', program: 'BSCS', status: 'Inactive' },
  { id: 3, studentNo: '2023-0003', name: 'Kristian David', program: 'BSIS', status: 'Active' }
])

const handleAddRecord = () => {
  if (!studentNo.value || !name.value || !program.value) return

  // Create new record with default Active status
  const newStudent = {
    id: Date.now(),
    studentNo: studentNo.value,
    name: name.value,
    program: program.value,
    yearLevel: yearLevel.value,
    status: 'Active' // <-- Default new records to Active status
  }

  students.value.push(newStudent)

  // Reset form fields
  studentNo.value = ''
  name.value = ''
  program.value = ''
  yearLevel.value = ''
}

const filteredStudents = computed(() => {
  return filterRecords(students.value, searchQuery.value, selectedStatus.value)
})
</script>