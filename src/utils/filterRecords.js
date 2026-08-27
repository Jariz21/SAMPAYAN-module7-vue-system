export function filterRecords(records, query) {
  if (!query || query.trim() === '') {
    return records;
  }

  const cleanQuery = query.toLowerCase().trim();

  return records.filter((student) => {
    const name = student.name ? student.name.toLowerCase() : '';
    const studentNo = student.studentNo ? String(student.studentNo).toLowerCase() : '';
    const program = student.program ? student.program.toLowerCase() : '';

    return name.includes(cleanQuery) || studentNo.includes(cleanQuery) || program.includes(cleanQuery);
  });
}