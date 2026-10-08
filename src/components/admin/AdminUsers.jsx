import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ROLE_LABELS, TEST_USERS } from '../../data/testUsers'
import { getApiUsers } from '../../services/users'
import authStore from '../../store/authStore'
import LoadingSpinner from '../loading/LoadingSpinner'
import Button from '../ui/Button'

const SOURCE_LABELS = { api: 'Fake Store API', test: 'Test user', local: 'Registered' }

const AdminUsers = () => {
  const registeredUsers = authStore((state) => state.registeredUsers)
  const toggleUserLock = authStore((state) => state.toggleUserLock)
  const [apiUsers, setApiUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getApiUsers()
      .then((users) => setApiUsers(users.map((user) => ({ ...user, role: 'customer', source: 'api' }))))
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [])

  const handleToggleLock = (user) => {
    toggleUserLock(user.username)
    toast.success(`User ${user.username} ${user.locked ? 'unlocked' : 'locked'}`)
  }

  const users = [...TEST_USERS, ...registeredUsers, ...apiUsers]

  return (
    <div className='flex flex-col gap-4'>
      {error && <p data-testid='admin-users-error' className='text-red-600'>Fake Store API users could not be loaded.</p>}

      <div className='table-wrapper'>
        <table className='data-table' data-testid='admin-users-table'>
          <thead>
            <tr>
              <th scope='col'>Username</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              <th scope='col'>Source</th>
              <th scope='col'>Status</th>
              <th scope='col'><span className='sr-only'>Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={`${user.source}-${user.id}`} data-testid={`admin-user-${user.username}`}>
                <td className='font-mono font-semibold'>{user.username}</td>
                <td className='capitalize'>{user.name.firstname} {user.name.lastname}</td>
                <td>{user.email}</td>
                <td>{ROLE_LABELS[user.role]}</td>
                <td className='text-gray-500'>{SOURCE_LABELS[user.source]}</td>
                <td>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${user.locked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}`}>
                    {user.locked ? 'Locked' : 'Active'}
                  </span>
                </td>
                <td>
                  {user.source === 'local' && (
                    <Button variant='outline' size='sm' data-testid='toggle-lock' onClick={() => handleToggleLock(user)}>
                      {user.locked ? 'Unlock' : 'Lock'}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isLoading && <LoadingSpinner fullPage={false} />}
    </div>
  )
}

export default AdminUsers
