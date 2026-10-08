export const TEST_PASSWORD = 'Apparel123!'

const testUser = (username, description, extra = {}) => ({
  id: username,
  username,
  password: TEST_PASSWORD,
  email: `${username}@apparelexpress.test`,
  name: { firstname: username.charAt(0).toUpperCase() + username.split('_')[0].slice(1), lastname: 'User' },
  role: 'customer',
  source: 'test',
  description,
  ...extra
})

export const TEST_USERS = [
  {
    id: 'admin',
    username: 'admin',
    password: 'Admin123!',
    email: 'admin@apparelexpress.test',
    name: { firstname: 'Store', lastname: 'Admin' },
    role: 'admin',
    source: 'test',
    description: 'Store administrator: manages products, orders and users'
  },
  testUser('standard_user', 'Regular customer, everything works as expected'),
  testUser('locked_out_user', 'Blocked account, cannot log in', { locked: true }),
  testUser('problem_user', 'Customer with several defects in catalog, cart and checkout'),
  testUser('slow_user', 'Customer whose login and API requests take 3 extra seconds'),
  testUser('error_user', 'Customer whose orders always fail when placed')
]

export const ROLE_LABELS = {
  guest: 'Guest',
  customer: 'Customer',
  admin: 'Administrator'
}
