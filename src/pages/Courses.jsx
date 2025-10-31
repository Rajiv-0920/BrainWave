import CourseCard from '../components/CourseCard'
import CourseCardSkeleton from '../components/CourseCardSkeleton'
import useFetch from '../hooks/useFetch'

const Courses = () => {
  const { data, loading, error } = useFetch('http://localhost:3000/api/courses')
  const courses = data?.data
  console.log(courses)

  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-extrabold text-gray-900'>Our Courses</h1>
          <p className='text-gray-600 mt-4 text-lg'>
            Explore our wide range of courses designed for success.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))
            : courses?.map((course, index) => (
                <CourseCard
                  key={index}
                  id={course._id}
                  title={course.title}
                  description={course.subtitle}
                  imageUrl={course.thumbnailUrl}
                />
              ))}
        </div>
      </div>
    </section>
  )
}

export default Courses
