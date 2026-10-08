import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import AuthShell from '../components/form/AuthShell'
import ErrorBanner from '../components/form/ErrorBanner'
import FormInput from '../components/form/FormInput'
import PasswordInput from '../components/form/PasswordInput'
import Button from '../components/ui/Button'
import useAuth from '../hooks/useAuth'
import { loginUser } from '../services/users'
import { validateLogin } from '../utils/validators'

const Login = () => {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [values, setValues] = useState({ username: location.state?.username ?? '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Login | E-commerce'
  }, [])

  if (user && !isSubmitting) return <Navigate to='/' replace />

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    const validationErrors = validateLogin(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      const sessionUser = await loginUser({ username: values.username.trim(), password: values.password })
      login(sessionUser)
      toast.success(`Welcome, ${sessionUser.name.firstname}!`)

      const redirect = searchParams.get('redirect')
      navigate(redirect || (sessionUser.role === 'admin' ? '/admin' : '/shop'), { replace: true })
    } catch (error) {
      setFormError(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell title='Welcome back' subtitle='Log in to check out faster and follow your orders.' image='/women-clothing.webp'>
      <form onSubmit={handleSubmit} noValidate data-testid='login-form' className='flex flex-col gap-5'>
        <ErrorBanner message={formError} testId='login-error' />

        <FormInput
          id='username'
          label='Username'
          autoComplete='username'
          value={values.username}
          onChange={handleChange}
          error={errors.username}
        />

        <PasswordInput
          id='password'
          label='Password'
          autoComplete='current-password'
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Button type='submit' size='lg' fullWidth data-testid='login-button' disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Login'}
        </Button>

        <p className='text-sm text-center text-gray-500'>
          Don&apos;t have an account?{' '}
          <Link to='/register' data-testid='register-link' className='font-semibold text-ink underline underline-offset-4'>Sign up</Link>
        </p>
      </form>
    </AuthShell>
  )
}

export default Login
