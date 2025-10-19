import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative bg-indigo-700 text-white py-20 lg:py-32">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Unlock Your Potential with EduHub
        </h1>
        <p className="text-lg md:text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
          Join thousands of learners and gain new skills with our expert-led
          online courses. Your future starts here.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/courses"
            className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300"
          >
            Browse Courses
          </Link>
          <Link
            to="/login"
            className="bg-transparent border-2 border-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-indigo-700 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
