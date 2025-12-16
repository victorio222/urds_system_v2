export const Spinner = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-[#F4F7FE]">
        <div className="relative">
          {/* Outer Static Ring */}
          <div className="w-16 h-16 rounded-full border-4 border-blue-100"></div>
          {/* Inner Spinning Ring */}
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  );
};
