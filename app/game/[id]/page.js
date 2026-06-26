import Link from "next/link";
export default async function GamePage({ params }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Game Banner */}
      <div className="relative w-full h-72 bg-zinc-900 flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <div className="relative z-20 px-10 pb-6 flex items-end gap-6">

          {/* Game Cover */}
          <div className="w-32 h-44 rounded-xl bg-zinc-800 flex-shrink-0 flex items-center justify-center border border-zinc-700">
            <span className="text-zinc-600 text-xs">Cover</span>
          </div>

          {/* Game Info */}
          <div className="flex flex-col gap-2 mb-2">
            <h1 className="text-4xl font-bold">Game Title</h1>
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <span>2024</span>
              <span className="text-zinc-600">•</span>
              <Link href="/genre/action" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 py-1 rounded-full transition-colors">Action</Link>
              <Link href="/genre/rpg" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 py-1 rounded-full transition-colors">RPG</Link>
              <span className="text-zinc-600">•</span>
              <span>PC, PS5, Xbox</span>
            </div>
            {/* Rating Badge */}
            <div className="flex items-center gap-2 mt-1">
              <div className="bg-yellow-500 text-black font-bold text-sm px-3 py-1 rounded-full">
                92%
              </div>
              <span className="text-zinc-400 text-sm">Community Score</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8 px-10 py-8">

        {/* Left — Description + Reviews */}
        <div className="flex-1">

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3 text-zinc-300 uppercase tracking-widest">About</h2>
            <p className="text-zinc-400 leading-relaxed max-w-2xl">
              Placeholder description for this game. Once we connect IGDB, this will
              automatically pull the real summary, genre, platforms, and release date.
            </p>
          </div>

          {/* Reviews Section */}
          <div>
            <h2 className="text-lg font-bold mb-6 text-zinc-300 uppercase tracking-widest">
              Community Reviews
            </h2>

            {/* Write a Review Box */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8">
              <p className="text-zinc-500 text-sm mb-3">Share your thoughts on this game</p>
              <textarea
                placeholder="Write your review..."
                className="w-full bg-zinc-800 text-white placeholder-zinc-600 rounded-xl p-4 text-sm outline-none resize-none h-24 border border-zinc-700 focus:border-zinc-500 transition-colors"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  Rating:
                  {[1,2,3,4,5].map((star) => (
                    <button key={star} className="text-zinc-600 hover:text-yellow-400 transition-colors text-lg">★</button>
                  ))}
                </div>
                <button className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-zinc-200 transition-colors">
                  Post
                </button>
              </div>
            </div>

            {/* Sample Review Card */}
            <div className="flex gap-4 py-5 border-b border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm">UserName</span>
                  <span className="text-yellow-400 text-sm">★★★★☆</span>
                  <span className="text-zinc-500 text-xs">2 days ago</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                  One of the best games I've played this year. The world-building is incredible
                  and the combat never gets old. Highly recommend.
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="text-zinc-500 hover:text-white text-xs flex items-center gap-1 transition-colors">
                    👍 Helpful (12)
                  </button>
                  <button className="text-zinc-500 hover:text-white text-xs transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 flex-shrink-0">

          {/* Game Details */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Details</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Developer</span>
                <span className="text-white">Studio Name</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Publisher</span>
                <span className="text-white">Publisher Name</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Released</span>
                <span className="text-white">2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Platforms</span>
                <span className="text-white">PC, PS5</span>
              </div>
            </div>
          </div>

          {/* Add to Playlist Button */}
          <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-sm font-semibold py-3 rounded-full transition-colors">
            + Add to Playlist
          </button>

        </div>

      </div>
    </div>
  );
}
