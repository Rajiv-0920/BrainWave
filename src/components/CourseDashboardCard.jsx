import { BookOpen } from 'lucide-react'

const CourseDashboardCard = ({ title, progress, instructor, category }) => {
  console.log('Console ', title, progress, instructor, category)
  const progressColor =
    progress >= 75
      ? 'bg-green-500'
      : progress >= 50
      ? 'bg-yellow-500'
      : 'bg-indigo-500'
  const progressText = progress >= 100 ? 'Completed' : 'In Progress'
  const progressWidth = `${Math.min(100, progress)}%`

  return (
    <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1'>
      <div className='flex justify-between items-start mb-4'>
        <h3 className='text-xl font-semibold text-gray-800 leading-tight'>
          {title}
        </h3>
        <BookOpen className='text-indigo-500 w-6 h-6 flex-shrink-0' />
      </div>

      <p className='text-sm text-gray-500 mb-4 flex-grow'>
        <span className='font-medium text-gray-700'>Category:</span> {category}
      </p>

      <div className='mb-4'>
        <p className='text-sm font-medium text-gray-600 mb-1'>
          {progressText} ({progress}%)
        </p>
        <div className='w-full bg-gray-200 rounded-full h-2.5'>
          <div
            className={`h-2.5 rounded-full ${progressColor} transition-all duration-500 ease-out`}
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>

      <div className='border-t pt-3 flex justify-between items-center text-sm text-gray-500'>
        <p>
          Instructor:{' '}
          <span className='font-medium text-indigo-600'>{instructor.name}</span>
        </p>
        <button className='text-indigo-600 hover:text-indigo-800 font-medium'>
          Continue &rarr;
        </button>
      </div>
    </div>
  )
}

export default CourseDashboardCard
