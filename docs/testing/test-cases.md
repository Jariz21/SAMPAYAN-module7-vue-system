# Module 8 Manual Test Cases

| Test Case ID | Feature / Scenario | Test Steps | Expected Result | Status | Evidence Filename |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Add valid record | Fill form with valid details and submit | Record appears in list; count increases | **PASS** |
| **TC-02** | Missing field validation | Submit form with empty item name | Form rejects submit; error message shows | **PASS** |
| **TC-03** | Boundary / Invalid Input | Enter negative numbers or invalid values | Input blocked or handled gracefully | **PASS** |
| **TC-04** | Display multiple records | Add 3 different records | All 3 records render in table/grid | **PASS** |
| **TC-05** | Edit existing record | Click Edit, update details, save | Table updates with new values | **PASS** |
| **TC-06** | Cancel record deletion | Click Delete -> click Cancel | Record remains in list | **PASS** |
| **TC-07** | Confirm record deletion | Click Delete -> click Confirm | Record is removed from list | **PASS** |
| **TC-08** | Search existing record | Type matching keyword in search | Only matching record displays | **PASS** |
| **TC-09** | Search missing record | Type non-existent keyword | "No records found" state renders | **PASS** |
| **TC-10** | LocalStorage persistence | Refresh page after adding data | Data persists from localStorage | **PASS** |
| **TC-11** | Duplicate Student No. Block | Enter an existing Student Number and click Submit | Submission blocked; red error banner (⚠️) displays | **PASS** |
| **TC-12** | Real-time Status Filter | Select "Active" or "Inactive" from filter dropdown | Table filters dynamically to show matching records | **PASS** |