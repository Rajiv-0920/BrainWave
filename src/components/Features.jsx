import { User, Clock, Award, Users } from "lucide-react";

const features = [
  {
    icon: <User className="h-8 w-8 text-indigo-600" />,
    title: "Expert Instructors",
    description: "Learn from industry leaders with years of experience.",
  },
  {
    icon: <Clock className="h-8 w-8 text-indigo-600" />,
    title: "Flexible Learning",
    description: "Study at your own pace, anytime, anywhere.",
  },
  {
    icon: <Award className="h-8 w-8 text-indigo-600" />,
    title: "Certifications",
    description: "Earn recognized certificates to boost your career.",
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-600" />,
    title: "Community Support",
    description: "Join a vibrant community of learners and mentors.",
  },
];

function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose BrainWave?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
