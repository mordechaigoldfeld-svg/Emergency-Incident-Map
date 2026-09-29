import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  role: 'user' | 'admin'
}

interface AuthState {
  token: string | null
  user: User | null
  setAuth: (data: { token: string; user: User }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWJiOTVmMTNlMzQ1YWEwMmMzYWUyNWUiLCJpYXQiOjE3OTA2Nzg2NDQsImV4cCI6MTc5MDc2NTA0NH0.M-R-a19cmCyK5k3gkRfmohg0ncMLeID12sZLdjjEJNs',
      user: null,

    
      setAuth: ({ token, user }) => set({ token, user }),

    
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)