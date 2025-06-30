const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-100 via-white to-blue-200 py-24 px-4 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-3xl -z-10" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl -z-10" />
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-2xl -z-10" />
      <div className="absolute bottom-0 right-1/3 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-2xl -z-10" />

      <div className="container mx-auto max-w-4xl flex flex-col items-center text-center relative z-10">
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-block w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 12.414A6 6 0 1112.414 13.414l4.243 4.243a1 1 0 001.414-1.414z"
              />
            </svg>
          </span>
          <span className="uppercase tracking-widest text-blue-700 font-semibold text-sm bg-blue-100 px-3 py-1 rounded-full shadow">
            Explore the world
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-blue-800 mb-6 drop-shadow-xl leading-tight">
          Plan Your <span className="text-blue-600">Next Adventure</span>
        </h1>
        <p className="text-lg md:text-2xl text-blue-700 mb-10 max-w-2xl">
          Discover, organize, and remember your journeys with{" "}
          <span className="font-bold text-blue-900">Travel Planner</span>.
          Effortlessly manage your trips, locations, and memories—all in one
          place.
        </p>
        <a
          href="/trips/new"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-10 py-4 rounded-2xl shadow-xl text-xl transition-all duration-200 transform hover:scale-105"
        >
          Start Planning
        </a>
      </div>
    </section>
  );
};

export default Hero;
