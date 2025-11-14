import { AlertTriangle, BarChart2, Loader } from 'lucide-react'
import CourseDashboardCardSkeleton from './CourseDashboardCardSkeleton'
import CourseDashboardCard from './CourseDashboardCard'

// --- 3. DashboardUI (The Presentation Logic) ---
const DashboardUI = ({ courses, loading, error, isAuthenticated }) => {
  // Access Denied State
  if (!isAuthenticated) {
    return (
      <div className='text-center p-12 bg-white rounded-2xl shadow-2xl max-w-lg mx-auto border-t-4 border-red-500'>
        <AlertTriangle className='w-16 h-16 text-red-500 mx-auto mb-4' />
        <h2 className='text-3xl font-extrabold text-red-700 mb-3'>
          Access Denied
        </h2>
        <p className='text-gray-600 mb-8'>
          You must be logged in to view your enrolled courses and personalized
          dashboard.
        </p>
        <a
          href='/login'
          className='bg-red-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-red-700 transition-colors shadow-lg'
        >
          Go to Login
        </a>
      </div>
    )
  }

  // Loading State with Skeletons
  if (loading) {
    return (
      <div className='p-8'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6 flex items-center'>
          <Loader className='w-7 h-7 mr-3 animate-spin text-indigo-500' />
          Loading Your Courses...
        </h2>
        {/* Use the new 4-column layout for skeletons */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {[...Array(4)].map((_, index) => (
            <CourseDashboardCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className='text-center p-8 bg-red-100 rounded-xl shadow-xl max-w-lg mx-auto border border-red-300'>
        <AlertTriangle className='w-12 h-12 text-red-600 mx-auto mb-3' />
        <h2 className='text-2xl font-bold text-red-700 mb-2'>
          Data Loading Error
        </h2>
        <p className='text-red-600 font-medium'>{error}</p>
        <p className='text-sm text-red-500 mt-2'>
          Please try refreshing the page.
        </p>
      </div>
    )
  }

  // No Courses Enrolled State
  if (courses.length === 0) {
    return (
      <div className='text-center p-12 bg-white rounded-2xl shadow-xl max-w-lg mx-auto border-t-4 border-indigo-500'>
        <BarChart2 className='w-16 h-16 text-indigo-500 mx-auto mb-4' />
        <h2 className='text-3xl font-extrabold text-gray-800 mb-3'>
          No Courses Enrolled
        </h2>
        <p className='text-gray-600 mb-8'>
          It looks like you haven't started any courses yet. Find your first one
          and start learning!
        </p>
        <a
          href='/browse-courses'
          className='inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg'
        >
          Browse All Courses
        </a>
      </div>
    )
  }

  // Success State (The Main Dashboard)
  return (
    <div className='p-4 sm:p-8'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Enrolled Courses ({courses.length})
      </h2>

      {/* Grid Layout: 1, 2, or 4 columns */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
        {courses.map((course) => (
          <CourseDashboardCard key={course._id} {...course} />
        ))}
      </div>
    </div>
  )
}

export default DashboardUI
