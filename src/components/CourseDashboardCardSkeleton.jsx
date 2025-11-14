const CourseDashboardCardSkeleton = () => (
  <div className='bg-gray-100 p-6 rounded-xl shadow-lg animate-pulse border border-gray-200 h-64'>
    {/* Title and Icon Placeholder */}
    <div className='flex justify-between items-start mb-6'>
      <div className='h-6 bg-gray-300 rounded w-3/4'></div>
      <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
    </div>

    {/* Category Placeholder */}
    <div className='h-4 bg-gray-300 rounded w-1/2 mb-4'></div>

    {/* Progress Bar Placeholder */}
    <div className='mb-4'>
      <div className='h-4 bg-gray-300 rounded w-1/4 mb-2'></div>
      <div className='w-full bg-gray-300 rounded-full h-2.5'>
        <div className='h-2.5 bg-gray-400 rounded-full w-[65%]'></div>
      </div>
    </div>

    {/* Footer Placeholder */}
    <div className='border-t pt-3 flex justify-between items-center text-sm'>
      <div className='h-4 bg-gray-300 rounded w-1/3'></div>
      <div className='h-4 bg-indigo-200 rounded w-1/5'></div>
    </div>
  </div>
)
export default CourseDashboardCardSkeleton
