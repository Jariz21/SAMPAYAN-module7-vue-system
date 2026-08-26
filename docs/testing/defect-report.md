# Defect Report: BUG-01

- **Defect ID:** BUG-01
- **Summary:** Form allowed empty spaces as valid item names.
- **Environment:** Chrome / Windows 11
- **Steps to Reproduce:**
  1. Open Add Record form.
  2. Type spaces ("   ") into Item Name field.
  3. Click Submit.
- **Expected Result:** Validation error indicating name cannot be empty.
- **Actual Result:** Blank item saved into record list.
- **Severity:** High | **Priority:** High
- **Status:** FIXED & RETESTED
- **Fix Commit:** "Fix validation logic to trim white spaces in form inputs"