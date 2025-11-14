import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react'

// 1. Create the Context
const AuthContext = createContext(null)
const API_LOGIN_URL = 'http://localhost:3000/api/auth/login'
const API_AUTH_URL = 'http://localhost:3000/api/auth'
const API_USER_URL = 'http://localhost:3000/api/me'

/**
 * Custom hook to use the Auth context easily.
 */
export const useAuth = () => useContext(AuthContext)

/**
 * Provides the authentication state and actions.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)

  const fetchUserDetails = useCallback(async () => {
    console.log('Attempting to fetch user details using token...')

    // 1. Define the API endpoint for fetching the current user's details
    const USER_INFO_ENDPOINT = API_USER_URL

    try {
      // 2. Perform the actual API request
      const response = await fetch(USER_INFO_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      console.log(response)
      // 4. Check for HTTP errors (e.g., 401 Unauthorized, 404 Not Found)
      if (!response.ok) {
        // Throw an error to be caught in the catch block
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // 5. Parse the JSON response body
      const userData = await response.json()

      // 6. Update the component state
      setUser(userData)
      setIsAuthenticated(true)

      return true // Success
    } catch (error) {
      // 7. Handle network errors, JSON parsing errors, and HTTP errors
      console.error('Failed to fetch user details:', error.message)

      // Optional: Clear state or redirect on failure
      setUser(null)
      setIsAuthenticated(false)

      return false // Failure
    }
  }, [setUser, setIsAuthenticated]) // Dependencies remain the state setters

  // 5. Logout Function
  const logout = async () => {
    try {
      await fetch(API_AUTH_URL + `/logout`, {
        method: 'POST',
      })
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // 3. Check authentication status on initial load
  useEffect(() => {
    // We MUST always attempt to fetch user details to validate the cookie
    // Since we don't use localStorage, there is no conditional check here.
    fetchUserDetails().finally(() => {
      // Set loading to false ONLY after the auth check is complete
      setLoadingInitial(false)
    })
  }, [fetchUserDetails]) // Re-run only if fetchUserDetails reference changes (unlikely)

  // 4. Login Function (handles API call and state updates)
  const login = async (email, password) => {
    try {
      const response = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // IMPORTANT: Ensure credentials is included to receive the Set-Cookie header
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message || `Login failed with status: ${response.status}`
        )
      }

      // *** KEY CHANGE FOR COOKIES: ***
      // 1. We no longer store a token in localStorage.
      // 2. We immediately call fetchUserDetails to use the cookie the server just set.
      await fetchUserDetails()

      // Data is already set by fetchUserDetails, so we just return success
      return true
    } catch (error) {
      console.error('Login Error in Context:', error.message)
      // Call local logout to ensure state is cleared on login failure
      logout()
      throw error // Re-throw the error so the Login form can display it
    }
  }

  // 6. Context Value
  const value = {
    user,
    isAuthenticated,
    loading: loadingInitial,
    login,
    logout,
    userName: user ? user.name : null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
