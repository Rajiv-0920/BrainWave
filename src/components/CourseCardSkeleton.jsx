const CourseCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="animate-pulse">
        {/* Image Placeholder */}
        <div className="bg-gray-300 w-full h-48"></div>

        <div className="p-6">
          {/* Title Placeholder */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

          {/* Description Placeholder */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>

          {/* Button Placeholder */}
          <div className="mt-4 h-10 w-32 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
