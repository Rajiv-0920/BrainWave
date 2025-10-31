import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const courseData = {
  title: 'AI Ethics and Responsible Innovation',
  subtitle:
    'Understand the ethical, social, and legal implications of artificial intelligence and learn to design responsible AI systems.',
  instructor: {
    name: 'Dr. Hannah Lee',
    bio: 'Ethicist and AI Policy Researcher with 15+ years of experience in technology governance, responsible AI, and human-centered design.',
  },
  category: 'Artificial Intelligence',
  level: 'Intermediate',
  language: 'English',
  tags: [
    'AI Ethics',
    'Responsible AI',
    'Policy',
    'Data Privacy',
    'AI Governance',
  ],
  price: {
    amount: 59.99,
    currency: 'USD',
  },
  thumbnailUrl: 'https://placehold.co/600x400/7B6EF6/FFFFFF?text=AI+Ethics',
  estimatedDuration: '12 hours',
  modules: [
    {
      title: 'Module 1: Foundations of AI Ethics',
      order: 1,
      lessons: [
        {
          title: 'Why Ethics Matters in AI',
          order: 1,
          type: 'video',
          duration: 1100,
          videoUrl: 'https://cdn.example.com/videos/c010/l101.mp4',
          isPreviewable: true,
          resources: [],
        },
        {
          title: 'Ethical Frameworks for AI Decision-Making',
          order: 2,
          type: 'text',
          duration: 600,
          content:
            '<h1>Ethical Frameworks</h1><p>Explore key ethical approaches including utilitarianism, deontology, and virtue ethics in the context of AI design and deployment.</p>',
          isPreviewable: false,
          resources: [
            {
              title: 'Ethical Frameworks Summary.pdf',
              url: '/resources/ethical-frameworks-summary.pdf',
            },
          ],
        },
      ],
    },
    {
      title: 'Module 2: Building Responsible AI Systems',
      order: 2,
      lessons: [
        {
          title: 'Bias, Fairness, and Transparency in AI',
          order: 1,
          type: 'video',
          duration: 1600,
          videoUrl: 'https://cdn.example.com/videos/c010/l201.mp4',
          isPreviewable: false,
          resources: [
            {
              title: 'AI Fairness Checklist.pdf',
              url: '/resources/ai-fairness-checklist.pdf',
            },
          ],
        },
        {
          title: 'AI Governance and Global Regulations',
          order: 2,
          type: 'video',
          duration: 1800,
          videoUrl: 'https://cdn.example.com/videos/c010/l202.mp4',
          isPreviewable: false,
          resources: [],
        },
      ],
    },
  ],
}

const formatDuration = (seconds) => {
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds > 0 ? `${remainingSeconds}s` : ''}`
}

const LessonItem = ({ lesson }) => (
  <div className='flex justify-between items-center py-3 px-4 hover:bg-gray-50 rounded-md'>
    <div className='flex items-center'>
      {lesson.type === 'video' ? (
        <svg
          className='w-5 h-5 mr-3 text-gray-500'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
          ></path>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          ></path>
        </svg>
      ) : (
        <svg
          className='w-5 h-5 mr-3 text-gray-500'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          ></path>
        </svg>
      )}
      <span className='text-gray-800'>{lesson.title}</span>
    </div>
    <div className='flex items-center space-x-4'>
      {lesson.isPreviewable && (
        <span className='text-sm text-indigo-600 font-semibold'>Preview</span>
      )}
      <span className='text-sm text-gray-500'>
        {formatDuration(lesson.duration)}
      </span>
    </div>
  </div>
)

const ModuleAccordion = ({ module, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0) // Open first module by default

  return (
    <div className='border border-gray-200 rounded-lg mb-4'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none'
      >
        <h3 className='text-lg font-semibold text-gray-800'>{module.title}</h3>
        <svg
          className={`w-6 h-6 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className='p-2'>
          {module.lessons.map((lesson) => (
            <LessonItem key={lesson.order} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  )
}

const CourseDetailPage = () => {
  const { courseId } = useParams()
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/courses/${courseId}`
  )

  // 1. Handle Loading State
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 p-6'>
        <div className='flex flex-col items-center'>
          <svg
            className='animate-spin h-8 w-8 text-indigo-600'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          <p className='mt-4 text-gray-600'>Loading course details...</p>
        </div>
      </div>
    )
  }

  // 2. Handle Error State
  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-red-50 p-6'>
        <div className='text-center p-8 bg-white rounded-xl shadow-lg border border-red-300'>
          <h2 className='text-2xl font-bold text-red-600 mb-2'>
            Error Loading Data
          </h2>
          <p className='text-gray-700'>
            Could not load the course details. Please try again later.
          </p>
          <p className='text-sm text-red-500 mt-2'>Details: {error}</p>
        </div>
      </div>
    )
  }

  // 3. Handle Null/No Data Case (e.g., if API returns a 404 or empty response)
  if (!data) {
    ;<div className='min-h-screen flex items-center justify-center bg-gray-50 p-6'>
      <div className='text-center p-8 bg-white rounded-xl shadow-lg border border-gray-300'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Course Not Found (404)
        </h2>
        <p className='text-gray-600'>
          The course you are looking for does not exist or has been removed.
        </p>
      </div>
    </div>
  }

  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <header className='bg-gray-900 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <h1 className='text-4xl font-extrabold mb-4'>{data.data.title}</h1>
            <p className='text-xl text-gray-300 mb-6'>{data.data.subtitle}</p>
            <div className='flex items-center space-x-4 text-sm text-gray-400'>
              <span>
                By <strong>{data.data.instructor.name}</strong>
              </span>
              <span>|</span>
              <span>
                Level: <strong>{data.data.level}</strong>
              </span>
              <span>|</span>
              <span>
                Duration: <strong>{data.data.estimatedDuration}</strong>
              </span>
              <span>|</span>
              <span>
                Language: <strong>{data.data.language}</strong>
              </span>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col lg:flex-row-reverse gap-12'>
          {/* Right Sidebar */}
          <aside className='lg:w-1/3 lg:sticky top-24 self-start'>
            <div className='bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden'>
              <img
                src={data.data.thumbnailUrl}
                alt={data.data.title}
                className='w-full h-auto object-cover'
              />
              <div className='p-6'>
                <p className='text-3xl font-bold text-gray-800 mb-4'>
                  ${data.data.price.amount}
                </p>
                <button className='w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300'>
                  Enroll Now
                </button>
                <div className='mt-6'>
                  <h4 className='font-bold text-gray-700 mb-3'>
                    This course includes:
                  </h4>
                  <ul className='text-gray-600 space-y-2 text-sm'>
                    <li className='flex items-center'>
                      <svg
                        className='w-4 h-4 mr-2 text-green-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                      {data.data.estimatedDuration} of on-demand video
                    </li>
                    <li className='flex items-center'>
                      <svg
                        className='w-4 h-4 mr-2 text-green-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                      Full lifetime access
                    </li>
                    <li className='flex items-center'>
                      <svg
                        className='w-4 h-4 mr-2 text-green-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                      Certificate of completion
                    </li>
                  </ul>
                </div>
                <div className='mt-6'>
                  <h4 className='font-bold text-gray-700 mb-3'>Tags:</h4>
                  <div className='flex flex-wrap gap-2'>
                    {data.data.tags.map((tag) => (
                      <span
                        key={tag}
                        className='bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Left Content */}
          <div className='lg:w-2/3'>
            {/* Course Curriculum */}
            <section>
              <h2 className='text-3xl font-bold text-gray-800 mb-6'>
                Course Curriculum
              </h2>
              {data.data.modules.map((module, index) => (
                <ModuleAccordion
                  key={module.order}
                  module={module}
                  index={index}
                />
              ))}
            </section>

            {/* Instructor Section */}
            <section className='mt-12'>
              <h2 className='text-3xl font-bold text-gray-800 mb-6'>
                About the Instructor
              </h2>
              <div className='bg-gray-50 p-6 rounded-lg flex items-center'>
                <img
                  className='w-24 h-24 rounded-full mr-6'
                  src='https://placehold.co/100x100/504099/FFFFFF?text=Dr.+Lee'
                  alt={data.data.instructor.name}
                />
                <div>
                  <h3 className='text-xl font-bold text-gray-800'>
                    {data.data.instructor.name}
                  </h3>
                  <p className='text-gray-600 mt-2'>
                    {data.data.instructor.bio}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CourseDetailPage
