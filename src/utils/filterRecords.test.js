import { describe, it, expect } from 'vitest';
import { filterRecords } from './filterRecords';

const mockStudents = [
  { id: 1, studentNo: '2023-0001', name: 'Jariz Jane G. Sampayan', program: 'BSIT', status: 'Active' },
  { id: 2, studentNo: '2023-0002', name: 'John Lloyd E. Saban', program: 'BSCS', status: 'Inactive' },
  { id: 3, studentNo: '2023-0003', name: 'Kristian David', program: 'BSIS', status: 'Active' }
];

describe('filterRecords Utility (Module 9 Evolution)', () => {
  it('filters records by search query', () => {
    const result = filterRecords(mockStudents, 'Jariz');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Jariz Jane G. Sampayan');
  });

  it('filters records by Active status', () => {
    const result = filterRecords(mockStudents, '', 'Active');
    expect(result).toHaveLength(2);
  });

  it('filters records by Inactive status', () => {
    const result = filterRecords(mockStudents, '', 'Inactive');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('John Lloyd E. Saban');
  });

  it('returns all records when statusFilter is All', () => {
    const result = filterRecords(mockStudents, '', 'All');
    expect(result).toHaveLength(3);
  });
});