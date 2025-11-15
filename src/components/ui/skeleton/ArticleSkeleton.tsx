function ArticleSkeleton() {
  return (
    <div className="space-y-6 group animate-pulse">
      {/* Image placeholder */}
      <div className="rounded-lg w-full max-h-60 h-60 bg-gray-300 overflow-hidden" />

      {/* Text placeholders */}
      <div className="space-y-2.5">
        <p className="bg-gray-300 h-6 sm:h-10 w-full rounded" />
        <p className="bg-gray-200 h-4 w-full rounded" />
      </div>

      {/* Date placeholder */}
      <p className="bg-gray-200 h-4 w-1/3 rounded" />
    </div>
  );
}

export default ArticleSkeleton;
