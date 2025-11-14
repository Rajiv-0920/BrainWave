import { useAuth } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import DashboardUI from '../components/DashboardUI'

// Handles all logic, state, and API calls.
const EnrolledCoursesContainer = () => {
  const { data, loading, error } = useFetch(
    'http://localhost:3000/api/enroll/my-courses',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  )
  const { isAuthenticated } = useAuth()
  const courses = data?.courses

  return (
    <div className='min-h-screen bg-gray-50 p-4 sm:p-8 font-sans'>
      <header className='py-6 mb-8 border-b border-gray-200'>
        <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight'>
          My Learning Dashboard
        </h1>
        <p className='text-lg text-gray-500 mt-1'>
          Courses you are actively enrolled in.
        </p>
      </header>
      <main>
        <DashboardUI
          courses={courses}
          loading={loading}
          error={error}
          isAuthenticated={isAuthenticated}
        />
      </main>
    </div>
  )
}

export default EnrolledCoursesContainer
