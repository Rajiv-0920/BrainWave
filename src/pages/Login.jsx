import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Custom Tailwind colors copied from Signup.jsx for consistency
const udemyPurple = 'bg-[#5624d0] hover:bg-[#401b9f]'
const udemyPurpleDisabled = 'bg-opacity-70'
const udemyError = 'text-red-600 bg-red-50 border-red-300'
const udemyBorder =
  'border-gray-300 focus:border-[#5624d0] focus:ring-[#5624d0]'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null) // Added success state for feedback
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (password.length === 0 || email.length === 0) {
      setError('Please enter both email and password.')
      return
    }

    setLoading(true)

    try {
      // 1. DELEGATE: Call the centralized login logic in the AuthProvider
      await login(email, password)

      // On successful return (isAuthenticated state updates in context)
      setSuccess('Login successful! Redirecting...')
      // Navigation is now handled naturally by the AuthRouter checking isAuthenticated
      navigate('/courses')
    } catch (err) {
      // Handle errors thrown up by the context's login function
      console.error('Login Error:', err)
      setError(err.message || 'Network error. Could not connect to the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col lg:flex-row bg-gray-50 font-inter'>
      {/* Left Side: Background Illustration/Image (Consistent with Signup) */}
      <div className='w-full lg:w-1/2 flex items-center justify-center bg-white p-6 h-80 lg:h-screen'>
        <img
          src='https://cdn.pixabay.com/photo/2013/07/13/12/43/girl-160173_1280.png'
          alt='Login Illustration'
          className='object-contain w-60 lg:w-96 rounded-lg'
          onError={(e) => {
            e.target.onerror = null
            e.target.src =
              'https://placehold.co/400x400/8b5cf6/ffffff?text=Illustration+Placeholder'
          }}
        />
      </div>

      {/* Right Side: Login Form */}
      <div className='lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 md:p-12'>
        <div className='w-full max-w-md bg-white p-8 sm:p-10 md:p-12 rounded-xl shadow-2xl border border-gray-100'>
          <h1 className='text-3xl font-bold mb-8 text-gray-900 text-left'>
            Log in to your account
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Error Message Display (consistent styling) */}
            {error && (
              <p className={`text-sm mb-4 p-3 border rounded-lg ${udemyError}`}>
                <span className='font-semibold'>Error:</span> {error}
              </p>
            )}

            {/* Success Message Display */}
            {success && (
              <div className='text-sm mb-4 p-3 border rounded-lg text-green-700 bg-green-50 border-green-300 font-semibold'>
                {success}
              </div>
            )}

            {/* Email Field */}
            <div className='mb-4'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 text-base border rounded-lg outline-none transition duration-200 ${udemyBorder}`}
                required
              />
            </div>

            {/* Password Field */}
            <div className='mb-6'>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 text-base border rounded-lg outline-none transition duration-200 ${udemyBorder}`}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type='submit'
              disabled={loading}
              className={`w-full py-3 text-base font-bold text-white rounded-lg transition duration-200 shadow-md ${udemyPurple} ${
                loading ? udemyPurpleDisabled : ''
              }`}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>

            {/* Divider */}
            <div className='relative text-center my-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <span className='relative inline-block bg-white px-3 text-sm text-gray-500'>
                or connect with
              </span>
            </div>

            {/* Social Buttons (Consistent with Signup) */}
            <div className='flex gap-3 mb-6 justify-center'>
              {['Google', 'Facebook', 'Apple'].map((service, index) => (
                <button
                  key={index}
                  type='button'
                  className='w-12 h-12 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-center shadow-sm hover:border-gray-400 transition duration-150'
                  title={`Login with ${service}`}
                >
                  <img
                    src={`https://www.svgrepo.com/show/${
                      service === 'Google'
                        ? '475656/google-color.svg'
                        : service === 'Facebook'
                        ? '452196/facebook-1.svg'
                        : '511330/apple-173.svg'
                    }`}
                    alt={service}
                    className='w-6 h-6'
                  />
                </button>
              ))}
            </div>

            {/* Forgot Password Link */}
            <p className='text-sm text-center mb-6'>
              <a
                href='#'
                className='font-bold text-[#5624d0] hover:text-[#401b9f] underline'
              >
                Forgot password?
              </a>
            </p>

            {/* Sign Up Link */}
            <p className='mt-6 text-center text-sm text-gray-600'>
              Don’t have an account?{' '}
              <Link
                to='/signup'
                className='text-[#5624d0] hover:text-[#401b9f] font-bold underline transition duration-150'
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
