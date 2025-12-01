import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  // Mock user data
  const mockUsers = {
    'demo@pontivo.io': {
      id: 'user-1',
      email: 'demo@pontivo.io',
      name: 'Anna Schmidt',
      avatar: null,
      role: 'consultant',
      tenantAccess: [
        {
          tenantId: 'tenant-1',
          tenantName: 'TechStartup GmbH',
          role: 'admin',
          projects: ['project-1', 'project-2']
        },
        {
          tenantId: 'tenant-2',
          tenantName: 'Müller & Partners',
          role: 'member',
          projects: ['project-3']
        }
      ]
    }
  }

  function login(email, password) {
    // Mock authentication
    if (mockUsers[email] && password === 'demo') {
      user.value = mockUsers[email]
      localStorage.setItem('pontivo_auth', 'true')
      localStorage.setItem('pontivo_user', JSON.stringify(user.value))
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('pontivo_auth')
    localStorage.removeItem('pontivo_user')
  }

  function initialize() {
    const stored = localStorage.getItem('pontivo_user')
    if (stored) {
      try {
        user.value = JSON.parse(stored)
      } catch (e) {
        logout()
      }
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    initialize
  }
})
