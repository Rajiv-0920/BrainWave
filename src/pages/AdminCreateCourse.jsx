import React, { useState } from 'react'
import { Link } from 'react-router-dom' // Assuming you use this for navigation

const AdminCreateCourse = () => {
  // Placeholder state for form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    duration: '',
    category: '',
    // Note: Prerequisites and Modules would typically be handled with dynamic fields
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement API call to your backend: POST /api/courses
    console.log('Form Submitted (Admin only):', formData)
    alert('Course creation form submission logic goes here!')
  }

  return (
    <div className='max-w-4xl mx-auto p-6 my-10 bg-white shadow-xl rounded-xl border border-gray-100'>
      <h1 className='text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-2'>
        Admin Panel: Create New Course
      </h1>

      <p className='text-sm text-gray-500 mb-6'>
        This route is intended to be protected by an admin-only check. Ensure
        your client-side logic redirects non-admin users.
      </p>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Course Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            value={formData.title}
            onChange={handleChange}
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='e.g., Advanced NodeJS Development'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            name='description'
            id='description'
            rows='4'
            value={formData.description}
            onChange={handleChange}
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='A comprehensive overview of the course content...'
          ></textarea>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          <div>
            <label
              htmlFor='price'
              className='block text-sm font-medium text-gray-700'
            >
              Price ($)
            </label>
            <input
              type='number'
              name='price'
              id='price'
              value={formData.price}
              onChange={handleChange}
              required
              min='0'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>

          <div>
            <label
              htmlFor='duration'
              className='block text-sm font-medium text-gray-700'
            >
              Duration (e.g., 10 hrs)
            </label>
            <input
              type='text'
              name='duration'
              id='duration'
              value={formData.duration}
              onChange={handleChange}
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>

          <div>
            <label
              htmlFor='category'
              className='block text-sm font-medium text-gray-700'
            >
              Category
            </label>
            <select
              name='category'
              id='category'
              value={formData.category}
              onChange={handleChange}
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            >
              <option value='' disabled>
                Select Category
              </option>
              <option value='Development'>Development</option>
              <option value='Design'>Design</option>
              <option value='Marketing'>Marketing</option>
              <option value='Business'>Business</option>
            </select>
          </div>
        </div>

        <button
          type='submit'
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out'
        >
          Create Course
        </button>
      </form>

      <div className='mt-6 text-center'>
        <Link
          to='/dashboard'
          className='text-indigo-600 hover:text-indigo-800 font-medium'
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default AdminCreateCourse
