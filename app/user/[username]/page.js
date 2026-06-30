import Image from "next/image";

const reviews = [
  {
    id: 1,
    gameTitle: "First Light 007",
    cover: null,
    timeAgo: "Few Minutes Ago",
    reviewText: "An absolutely stunning entry into the 007 franchise. The gunplay feels tight, the story keeps you hooked, and the open world is packed with detail. A must-play for any action fan.",
    rating: "4/5",
  },
];

export default async function UserProfilePage({ params }) {
  const { username } = await params;

  return (
    <div className="min-h-screen bg-black text-white px-10 py-10">

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-10">

        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>

        {/* Username + Stats */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            {username}
          </h1>
          <div className="flex items-center gap-4 text-zinc-400 text-sm">
            <span><strong className="text-white">2</strong> Followers</span>
            <span className="text-zinc-600">|</span>
            <span><strong className="text-white">5</strong> Following</span>
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex gap-10 border-b border-zinc-800 mb-8">
        <button className="text-white font-semibold pb-3 border-b-2 border-white">
          Reviews
        </button>
        <button className="text-zinc-500 font-semibold pb-3 border-b-2 border-transparent hover:text-zinc-300 transition-colors">
          Playlist
        </button>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-6">

            {/* Game Cover */}
            <div className="w-24 h-32 rounded-xl bg-zinc-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
              {review.cover ? (
                <Image src={review.cover} alt={review.gameTitle} width={96} height={128} className="object-cover" />
              ) : (
                <span className="text-zinc-600 text-xs">No Image</span>
              )}
            </div>

            {/* Review Content */}
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">{review.gameTitle}</h2>
              <p className="text-zinc-500 text-sm">{review.timeAgo}</p>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-xl">
                {review.reviewText}
              </p>
              <p className="text-zinc-400 text-sm">
                Rating: <strong className="text-white">{review.rating}</strong>
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
