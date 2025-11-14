import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Note: All Firebase imports have been removed as requested.
// Tailwind is assumed to be available.

const API_SIGNUP_URL = 'http://localhost:3000/api/auth/signup'

// Custom Tailwind colors based on Udemy purple and red for consistency
const udemyPurple = 'bg-[#5624d0] hover:bg-[#401b9f]'
const udemyPurpleDisabled = 'bg-opacity-70'
const udemyError = 'text-red-600 bg-red-50 border-red-300'
const udemyBorder =
  'border-gray-300 focus:border-[#5624d0] focus:ring-[#5624d0]'

export default function App() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [subscribed, setSubscribed] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setLoading(true)

    try {
      // 1. Send the registration data to the custom API endpoint
      const response = await fetch(API_SIGNUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          subscribed,
        }),
      })

      if (!response.ok) {
        // Handle HTTP error statuses (e.g., 400, 500)
        const errorData = await response
          .json()
          .catch(() => ({ message: 'Server error occurred.' }))
        const message =
          errorData.message || `Signup failed with status: ${response.status}`
        throw new Error(message)
      }

      // 2. Success handling
      // const data = await response.json()
      setSuccess('Signup successful! You can now log in.')

      // Clear form fields
      setFullName('')
      setEmail('')
      setPassword('')
      setError(null)
    } catch (err) {
      // Handle network errors or errors thrown by the API call
      console.error('Signup Error:', err)
      setError(err.message || 'Network error. Could not connect to the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col lg:flex-row bg-gray-50 font-inter'>
      {/* Left Side: Background Illustration/Image */}
      <div className='w-full lg:w-1/2 flex items-center justify-center bg-white p-6 h-80 lg:h-screen'>
        <img
          src='https://cdn.pixabay.com/photo/2013/07/13/12/43/girl-160173_1280.png'
          alt='Learning Illustration'
          className='object-contain w-60 lg:w-96 rounded-lg'
          onError={(e) => {
            e.target.onerror = null
            e.target.src =
              'https://placehold.co/400x400/8b5cf6/ffffff?text=Illustration+Placeholder'
          }}
        />
      </div>

      {/* Right Side: Signup Form */}
      <div className='lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 md:p-12'>
        <div className='w-full max-w-md bg-white p-8 sm:p-10 md:p-12 rounded-xl shadow-2xl border border-gray-100'>
          <h1 className='text-3xl font-bold mb-8 text-gray-900 text-left'>
            Sign up
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Full name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full px-4 py-3 text-base border rounded-lg outline-none transition duration-200 ${udemyBorder}`}
                required
              />
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className='mb-6'>
              <input
                type='password'
                placeholder='Password (at least 6 characters)'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 text-base border rounded-lg outline-none transition duration-200 ${udemyBorder}`}
                minLength={6}
                required
              />
            </div>

            {/* Error Message Display */}
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

            {/* Checkbox */}
            <div className='flex items-start mb-6 gap-2'>
              <input
                type='checkbox'
                id='subscribe'
                checked={subscribed}
                onChange={(e) => setSubscribed(e.target.checked)}
                className='w-5 h-5 mt-0.5 cursor-pointer accent-[#5624d0] flex-shrink-0 rounded'
              />
              <label
                htmlFor='subscribe'
                className='text-sm text-gray-700 leading-tight cursor-pointer'
              >
                Send me special offers, personalized recommendations, and
                learning tips.
              </label>
            </div>

            {/* Continue Button */}
            <button
              type='submit'
              disabled={loading}
              className={`w-full py-3 text-base font-bold text-white rounded-lg transition duration-200 shadow-md ${udemyPurple} ${
                loading ? udemyPurpleDisabled : ''
              }`}
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>

            {/* Divider */}
            <div className='relative text-center my-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <span className='relative inline-block bg-white px-3 text-sm text-gray-500'>
                Other sign up options
              </span>
            </div>

            {/* Social Buttons */}
            <div className='flex gap-3 mb-6 justify-center'>
              {['Google', 'Facebook', 'Apple'].map((service, index) => (
                <button
                  key={index}
                  type='button'
                  className='w-12 h-12 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-center shadow-sm hover:border-gray-400 transition duration-150'
                  title={`Sign up with ${service}`}
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

            {/* Terms */}
            <p className='text-xs text-gray-500 text-center mb-4 leading-relaxed'>
              By signing up, you agree to our{' '}
              <a
                href='#'
                className='text-[#5624d0] hover:text-[#401b9f] font-medium underline'
              >
                Terms of Use
              </a>{' '}
              and{' '}
              <a
                href='#'
                className='text-[#5624d0] hover:text-[#401b9f] font-medium underline'
              >
                Privacy Policy
              </a>
              .
            </p>

            {/* Login Link */}
            <p className='text-sm text-gray-600 text-center'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='text-[#5624d0] hover:text-[#401b9f] font-bold underline transition duration-150'
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
