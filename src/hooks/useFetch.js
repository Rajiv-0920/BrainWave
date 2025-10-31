import { useState, useEffect } from 'react'

/**
 * useFetch - Custom hook to fetch data from an API endpoint
 * @param {string} url - The API endpoint
 * @param {Array} deps - Optional dependency array for re-fetching
 * @returns {Object} { data, error, loading }
 */
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    let isMounted = true // to prevent state update on unmounted component
    setLoading(true)
    setError(null)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
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
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      isMounted = false // cleanup to prevent memory leaks
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch
