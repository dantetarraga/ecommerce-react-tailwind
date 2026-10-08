import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import AuthShell from '../components/form/AuthShell'
import Checkbox from '../components/form/Checkbox'
import ErrorBanner from '../components/form/ErrorBanner'
import FormInput from '../components/form/FormInput'
import PasswordInput from '../components/form/PasswordInput'
import Button from '../components/ui/Button'
import useAuth from '../hooks/useAuth'
import { registerUser } from '../services/users'
import { validateRegister } from '../utils/validators'

const INITIAL_VALUES = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
}

const Register = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Sign up | E-commerce'
  }, [])

  if (user) return <Navigate to='/' replace />

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues((prevValues) => ({ ...prevValues, [name]: type === 'checkbox' ? checked : value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    const validationErrors = validateRegister(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      const newUser = await registerUser({
        firstname: values.firstname.trim(),
        lastname: values.lastname.trim(),
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password
      })
      toast.success('Account created successfully. You can now log in.')
      navigate('/login', { state: { username: newUser.username } })
    } catch (error) {
      setFormError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell title='Create your account' subtitle='Join to save your cart, check out and track your orders.' image='/mens-clothing.webp'>
      <form onSubmit={handleSubmit} noValidate data-testid='register-form' className='flex flex-col gap-5'>
        <ErrorBanner message={formError} testId='register-error' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <FormInput id='firstname' label='First name' autoComplete='given-name' value={values.firstname} onChange={handleChange} error={errors.firstname} />
          <FormInput id='lastname' label='Last name' autoComplete='family-name' value={values.lastname} onChange={handleChange} error={errors.lastname} />
        </div>
        <FormInput id='username' label='Username' autoComplete='username' value={values.username} onChange={handleChange} error={errors.username} />
        <FormInput id='email' label='Email' type='email' autoComplete='email' value={values.email} onChange={handleChange} error={errors.email} />
        <PasswordInput
          id='password'
          label='Password'
          autoComplete='new-password'
          hint='8 to 20 characters, with an uppercase letter, a lowercase letter and a number.'
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <PasswordInput id='confirmPassword' label='Confirm password' autoComplete='new-password' value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

        <Checkbox
          id='terms'
          name='terms'
          data-testid='input-terms'
          label='I accept the terms and conditions'
          checked={values.terms}
          onChange={handleChange}
          error={errors.terms}
        />

        <Button type='submit' size='lg' fullWidth data-testid='register-button' disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Sign up'}
        </Button>

        <p className='text-sm text-center text-gray-500'>
          Already have an account?{' '}
          <Link to='/login' data-testid='login-link' className='font-semibold text-ink underline underline-offset-4'>Login</Link>
        </p>
      </form>
    </AuthShell>
  )
}

export default Register
