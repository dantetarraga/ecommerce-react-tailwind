import authStore from '../store/authStore'

const useAuth = () => {
  const { user, login, logout } = authStore()

  return {
    user,
    login,
    logout,
    role: user?.role ?? 'guest',
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  }
}

export default useAuth
