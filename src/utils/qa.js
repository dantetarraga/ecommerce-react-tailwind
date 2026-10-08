import authStore from '../store/authStore'

// Test users that simulate defects on purpose, in the style of saucedemo.com
const isCurrentUser = (username) => authStore.getState().user?.username === username

export const isProblemUser = () => isCurrentUser('problem_user')
export const isSlowUser = () => isCurrentUser('slow_user')
export const isErrorUser = () => isCurrentUser('error_user')
