import { useState, useEffect } from 'react'

/**
 * useFetch - Custom hook to fetch data from an API endpoint
 * @param {string} url - The API endpoint
 * @param {Object} [options={}] - Optional fetch configuration object (method, headers, body, credentials, etc.).
 * Defaults to a simple GET request if not provided.
 * @param {Array} [deps=[]] - Optional dependency array for re-fetching (defaulting to url)
 * @returns {Object} { data, error, loading }
 */

function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Combine URL and stringified options into dependencies to trigger effect on change
  const optionsString = JSON.stringify(options)

  useEffect(() => {
    if (!url) {
      setLoading(false)
      return
    }

    let isMounted = true
    setLoading(true)
    setError(null)

    // Parse optionsString back into an object
    const currentOptions = JSON.parse(optionsString)

    // 💡 Fetch call now uses the provided options
    fetch(url, currentOptions)
      .then((response) => {
        if (!response.ok) {
          // Throw the error with the response object for better debugging
          throw new Error(
            `HTTP error! Status: ${response.status} - ${response.statusText}`
          )
        }
        return response.json()
      })
      .then((json) => {
        if (isMounted) {
          setData(json)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('useFetch error:', err)
          setError(err.message)
          setLoading(false)
        }
      })

    return () => {
      isMounted = false // cleanup to prevent memory leaks
    }
  }, [url, optionsString]) // Hook re-runs when URL or options change

  return { data, loading, error }
}

export default useFetch
