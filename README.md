# SAMPAYAN Vue Management System

**Student Name:** Jariz Sampayan  
**Target Version:** v1.1.0  
**Repository:** `https://github.com/Jariz21/SAMPAYAN-module7-vue-system`  

---

## 📝 System Description
This Vue.js application provides a dynamic Student Information System (SIS) interface for managing student records efficiently. It supports full CRUD (Create, Read, Update, Delete) operations, centralized state management, real-time status filtering, duplicate entry prevention, and local browser persistence.

---

## 🏗️ System Architecture (Module 9 Evolution)

```text
       +-----------------------------------+
       |              App.vue              |
       | (Central State & localStorage)    |
       +-----------------+-----------------+
                         |
        +----------------+----------------+
        |                                 |
        v                                 v
+-----------------------+     +-----------------------+
|    RecordForm.vue     |     |    RecordList.vue     |
| (Duplicate ID Check & |     | (Status Filter &      |
|  Validation Banner)   |     |  Active/Inactive Tag) |
+-----------------------+     +-----------------------+
```

### Component Architecture & Data Flow
* **`App.vue` (Parent Component):** Serves as the central state manager. Handles array persistence in `localStorage`, computes filtered views, and performs duplicate student number validation before committing updates.
* **`RecordForm.vue` (Child Form Component):** Captures user inputs, executes client-side form validation, and displays an explicit red error banner (`⚠️`) when duplicate student IDs are detected.
* **`RecordList.vue` (Child Display Component):** Renders individual record cards with "Active" or "Inactive" status badges and provides a real-time status filter dropdown (`All`, `Active`, `Inactive`).

---

## ✨ Features Implemented
- [x] **Add Record:** Form with validation to create new student entries.
- [x] **Duplicate ID Prevention (CR-M9-01):** Blocks submission if a Student Number already exists and shows an alert banner.
- [x] **View Records:** Clean display of stored student data with dynamic status badges.
- [x] **Status Filtering (CR-M9-01):** Real-time dropdown filtering by status (`All`, `Active`, `Inactive`).
- [x] **Edit Record:** Update existing student details while preserving data integrity.
- [x] **Delete Record:** Remove entries with confirmation checks.
- [x] **Data Persistence & Migration:** Automatic saving/loading via `localStorage` with backward compatibility for legacy records.
- [x] **Responsive UI:** Styled with Tailwind CSS for mobile and desktop screens.

---

## 🛠️ Maintenance & Maintenance Type
* **Change Request ID:** CR-M9-01
* **Maintenance Type:** Perfective Maintenance & Refactoring
* **Scope:** State hoisting to `App.vue`, duplicate prevention logic, UI button standardization, and status tag integration.

---

## 🛠️ Technologies Used
* **Framework:** Vue.js 3 (Composition API)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Testing:** Vitest
* **Version Control & CI/CD:** Git, GitHub, GitHub Actions

---

## 🚀 Installation & Run Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Jariz21/SAMPAYAN-module7-vue-system.git](https://github.com/Jariz21/SAMPAYAN-module7-vue-system.git)
   cd SAMPAYAN-module7-vue-system