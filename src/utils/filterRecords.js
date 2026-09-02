export function filterRecords(records, query = '', statusFilter = 'All') {
  if (!Array.isArray(records)) return [];

  return records.filter((record) => {
    // 1. Check text search query against name, studentNo, and program
    const matchesQuery =
      !query ||
      [record.name, record.studentNo, record.program]
        .some(field => field && field.toLowerCase().includes(query.toLowerCase()));

    // 2. Check status filter
    const matchesStatus =
      statusFilter === 'All' ||
      (record.status || 'Active') === statusFilter;

    return matchesQuery && matchesStatus;
  });
}