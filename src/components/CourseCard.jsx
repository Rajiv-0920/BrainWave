import { Link } from "react-router-dom";

const CourseCard = ({ id, imageUrl, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Link
          to={`/course/${id}`}
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-200"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
