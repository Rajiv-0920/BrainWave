import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Destructure state and actions from the mock context
  const { isAuthenticated, userName, login, logout } = useAuth()

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className='sticky top-0 z-50 bg-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <NavLink
              to='/'
              className='text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors'
            >
              BrainWave
            </NavLink>
          </div>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className='hidden md:flex items-center space-x-6'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-gray-800'
                } hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`
              }
            >
              Home
            </NavLink>
            <NavLink
              to='/courses'
              className={({ isActive }) =>
                `${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-gray-800'
                } hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`
              }
            >
              Courses
            </NavLink>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                `${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-gray-800'
                } hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`
              }
            >
              About
            </NavLink>
            <NavLink
              to='/contact'
              className={({ isActive }) =>
                `${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-gray-800'
                } hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`
              }
            >
              Contact
            </NavLink>

            {/* Conditional Dashboard Link */}
            {isAuthenticated && (
              <>
                <NavLink
                  to='/enrolled-courses'
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? 'text-indigo-600 font-semibold'
                        : 'text-gray-800'
                    } hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`
                  }
                >
                  My Courses
                </NavLink>
                <NavLink
                  to='/dashboard'
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? 'text-indigo-600 font-semibold'
                        : 'text-gray-800'
                    } hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`
                  }
                >
                  Dashboard
                </NavLink>
              </>
            )}
          </div>

          {/* Desktop Auth/User Controls (Hidden on Mobile) */}
          <div className='hidden md:flex items-center space-x-3'>
            {isAuthenticated ? (
              // Display User Name and Logout button
              <div className='flex items-center space-x-3'>
                <span className='text-sm font-semibold text-gray-800 px-2'>
                  Hello, {userName.split(' ')[0]}!
                </span>
                <button
                  onClick={logout}
                  className='text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border border-gray-300 hover:border-red-600'
                >
                  Logout
                </button>
              </div>
            ) : (
              // Display Login and Sign Up buttons
              <>
                <Link
                  to='/login'
                  className='text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md'
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='flex md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              aria-expanded={isMenuOpen}
            >
              <span className='sr-only'>Open main menu</span>
              {/* Menu Icon */}
              <svg
                className={`block h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        id='mobile-menu'
      >
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100'>
          {/* Main Links */}
          <Link
            to='/'
            onClick={handleLinkClick}
            className='text-gray-600 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium'
          >
            Home
          </Link>
          <Link
            to='/courses'
            onClick={handleLinkClick}
            className='text-gray-600 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium'
          >
            Courses
          </Link>
          <Link
            to='/about'
            onClick={handleLinkClick}
            className='text-gray-600 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium'
          >
            About
          </Link>
          <Link
            to='/contact'
            onClick={handleLinkClick}
            className='text-gray-600 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium'
          >
            Contact
          </Link>

          {/* Conditional Mobile Dashboard Link */}
          {isAuthenticated && (
            <Link
              to='/dashboard'
              onClick={handleLinkClick}
              className='text-gray-600 bg-indigo-50 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium'
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Auth/User Controls */}
        <div className='px-5 pb-3 pt-2 space-y-2 border-t border-gray-100'>
          {isAuthenticated ? (
            // Mobile User Info and Logout
            <>
              <div className='py-2 px-4 text-base font-semibold text-gray-800'>
                Logged in as: {userName}
              </div>
              <button
                onClick={() => {
                  logout()
                  handleLinkClick()
                }} // Logout and close menu
                className='block w-full text-center text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-base font-medium transition-all duration-200'
              >
                Logout
              </button>
            </>
          ) : (
            // Mobile Login and Sign Up
            <>
              <Link
                to='/login'
                onClick={handleLinkClick}
                className='block w-full text-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md text-base font-medium border border-gray-300'
              >
                Login
              </Link>
              <Link
                to='/signup'
                onClick={handleLinkClick}
                className='block w-full text-center bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-base font-medium shadow-md'
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
