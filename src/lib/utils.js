import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(path) {
  return path
}

// Mock entity operations for frontend-only version
export const mockEntityOperations = {
  // Storage helper
  getStorageKey: (entityName) => `empowerher_${entityName}`,
  
  // Generic entity operations
  create: async (entityName, data) => {
    const key = mockEntityOperations.getStorageKey(entityName)
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    const newItem = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    existing.push(newItem)
    localStorage.setItem(key, JSON.stringify(existing))
    return newItem
  },
  
  list: async (entityName) => {
    const key = mockEntityOperations.getStorageKey(entityName)
    return JSON.parse(localStorage.getItem(key) || '[]')
  },
  
  filter: async (entityName, filterFn) => {
    const items = await mockEntityOperations.list(entityName)
    return items.filter(filterFn)
  },
  
  update: async (entityName, id, updates) => {
    const key = mockEntityOperations.getStorageKey(entityName)
    const items = JSON.parse(localStorage.getItem(key) || '[]')
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
      items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() }
      localStorage.setItem(key, JSON.stringify(items))
      return items[index]
    }
    return null
  },
  
  delete: async (entityName, id) => {
    const key = mockEntityOperations.getStorageKey(entityName)
    const items = JSON.parse(localStorage.getItem(key) || '[]')
    const filtered = items.filter(item => item.id !== id)
    localStorage.setItem(key, JSON.stringify(filtered))
    return true
  }
}

// Mock User operations
export const User = {
  me: async () => ({
    id: 'current_user',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    joinedAt: '2024-01-15'
  }),
  
  updateMyUserData: async (updates) => {
    // In real implementation, this would update the user profile
    return { ...await User.me(), ...updates }
  }
}
