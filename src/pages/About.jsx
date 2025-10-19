import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Jane Doe",
      role: "Founder & CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
    },
    {
      name: "John Smith",
      role: "Lead Instructor",
      imageUrl:
        "https://images.unsplash.com/photo-1639747280929-e84ef392c69a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
    },
    {
      name: "Emily White",
      role: "Head of Product",
      imageUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            About EduHub
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We are on a mission to make high-quality education accessible and
            affordable for everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, EduHub started as a small project by a group of
              passionate educators who saw a gap in the online learning market.
              We wanted to create a platform that was not just a repository of
              video lectures, but a vibrant community for learners and
              instructors.
            </p>
            <p className="text-gray-600">
              Today, we've grown into a global platform serving thousands of
              students, helping them unlock their potential and achieve their
              dreams. Our commitment to quality, affordability, and community
              remains at the heart of everything we do.
            </p>
          </div>
          <div>
            <img
              src="https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RWR1Y2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900"
              alt="Our Story"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Our Core Values
            </h2>
            <p className="text-gray-600 mt-2">The principles that guide us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-gray-600">
                We strive to make learning open to everyone, regardless of their
                background or location.
              </p>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-600">
                We are committed to providing the highest quality educational
                content and experience.
              </p>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600">
                We foster a supportive and collaborative environment for
                learners and teachers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Meet Our Team</h2>
            <p className="text-gray-600 mt-2">
              The passionate people behind EduHub.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  className="w-40 h-40 rounded-full object-cover mx-auto mb-4 shadow-lg"
                  src={member.imageUrl}
                  alt={member.name}
                />
                <h3 className="text-xl font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Us on Our Mission
          </h2>
          <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
            Start your learning journey with us today and become part of a
            growing global community.
          </p>
          <Link
            to="/courses"
            className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300"
          >
            Explore Courses
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
