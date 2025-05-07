export default function DriveSkeleton() {
  return (
    <div className="min-h-screen p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        {/* Header Skeleton with Upload Button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="h-6 w-40 rounded bg-gray-700 animate-pulse"></div>
          <div className="h-10 w-32 rounded-md bg-gray-700 animate-pulse"></div>
        </div>

        {/* Table Skeleton */}
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-gray-800 p-4 animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="h-6 w-6 rounded-full bg-gray-700"></div>
                <div className="h-4 w-24 md:w-48 rounded bg-gray-700"></div>
              </div>
              <div className="h-4 w-10 md:w-20 rounded bg-gray-700"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
