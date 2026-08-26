import { describe, it, expect } from 'vitest'
import { filterRecords } from './filterRecords'

describe('filterRecords utility', () => {
  const sampleData = [
    { id: 1, name: 'SAMPAYAN Item A' },
    { id: 2, name: 'Laundry Rack B' }
  ]

  it('filters records by search keyword accurately', () => {
    const results = filterRecords(sampleData, 'Rack')
    expect(results).toHaveLength(1)
    expect(results[0].name).toBe('Laundry Rack B')
  })

  it('handles case-insensitive search queries', () => {
    const results = filterRecords(sampleData, 'sampayan')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(1)
  })
})