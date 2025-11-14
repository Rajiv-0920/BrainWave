import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ScrollToTop from './components/ScrollToTop'
import CourseDetailPage from './pages/CourseDetials'
import EnrolledCoursesContainer from './pages/EnrolledCoursesContainer'
import AdminCreateCourse from './pages/AdminCreateCourse'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <ScrollToTop />
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/course/:courseId' element={<CourseDetailPage />} />{' '}
          <Route path='/courses' element={<Courses />} />
          <Route
            path='/enrolled-courses'
            element={<EnrolledCoursesContainer />}
          />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admin' element={<AdminCreateCourse />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
