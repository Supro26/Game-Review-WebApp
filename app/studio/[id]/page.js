import Link from "next/link";
import GameCard from "@/components/game/GameCard";

const studio = {
  name: "Rockstar Games",
  founded: "1998",
  headquarters: "New York, USA",
  rating: 4.8,
  totalGames: 24,
  followers: "2.1M",
  totalReviews: "840K",
  description:
    "Rockstar Games is an American video game publisher known for creating some of the most critically acclaimed and commercially successful games in history. Famous for open-world storytelling and cinematic experiences.",
  games: [
    { id: 7, title: "Red Dead Redemption 2", cover: null },
    { id: 25, title: "GTA V", cover: null },
    { id: 26, title: "Red Dead Redemption", cover: null },
    { id: 27, title: "Bully", cover: null },
    { id: 28, title: "Max Payne 3", cover: null },
    { id: 29, title: "L.A. Noire", cover: null },
  ],
  topCharacters: [
    { id: 1, name: "Arthur Morgan", game: "RDR2", rating: 97 },
    { id: 30, name: "John Marston", game: "RDR", rating: 95 },
    { id: 31, name: "Trevor Philips", game: "GTA V", rating: 91 },
    { id: 32, name: "Jimmy Hopkins", game: "Bully", rating: 88 },
  ],
  topRated: [
    { title: "Red Dead Redemption 2", score: "97%" },
    { title: "GTA V", score: "95%" },
    { title: "Red Dead Redemption", score: "93%" },
  ],
};

export default async function StudioPage({ params }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Studio Header */}
      <div className="flex flex-col items-center pt-14 pb-10 px-6 border-b border-zinc-800">
        <div className="w-28 h-28 rounded-full bg-zinc-800 border-4 border-zinc-700 flex items-center justify-center mb-5 flex-shrink-0">
          <span className="text-zinc-500 text-xs text-center px-2">{studio.name}</span>
        </div>
        <h1 className="text-4xl font-bold mb-1">{studio.name}</h1>
        <p className="text-zinc-400 text-sm mb-4">Founded {studio.founded} · {studio.headquarters}</p>
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-yellow-500 text-black font-bold text-sm px-4 py-1 rounded-full">
            ⭐ {studio.rating}
          </div>
          <span className="text-zinc-400 text-sm">Community Rating</span>
        </div>
        <div className="flex items-center gap-10 text-center">
          {[
            { label: "Games", value: studio.totalGames },
            { label: "Followers", value: studio.followers },
            { label: "Reviews", value: studio.totalReviews },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-white text-xl font-bold">{value}</p>
              <p className="text-zinc-500 text-xs uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8 px-10 py-10">

        {/* Left — About + Games + Characters */}
        <div className="flex-1 min-w-0">

          {/* About */}
          <div className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">About</h2>
            <p className="text-zinc-400 leading-relaxed">{studio.description}</p>
          </div>

          {/* Games */}
          <div className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Games</h2>
            <div className="flex gap-5 overflow-x-auto pb-2">
              {studio.games.map((game) => (
                <div key={game.id} className="flex-shrink-0">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </div>

          {/* Top Characters */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Top Characters</h2>
            <div className="flex flex-col gap-4">
              {studio.topCharacters.map((char) => (
                <Link key={char.id} href={`/character/${char.id}`}>
                  <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 hover:border-zinc-600 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">{char.name}</p>
                      <p className="text-zinc-500 text-xs">{char.game}</p>
                    </div>
                    <div className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full">
                      {char.rating}%
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-64 flex-shrink-0">

          {/* Top Rated Games */}
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-5">Top Rated</h2>
            <div className="flex flex-col gap-3">
              {studio.topRated.map((game, i) => (
                <div key={game.title} className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
                  <span className="text-zinc-600 text-sm w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{game.title}</p>
                  </div>
                  <span className="text-yellow-400 text-xs font-bold flex-shrink-0">{game.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <button className="w-full bg-white text-black text-sm font-bold py-3 rounded-full hover:bg-zinc-200 transition-colors mb-3">
            + Follow Studio
          </button>
          <button className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm font-semibold py-3 rounded-full hover:bg-zinc-800 transition-colors">
            Share
          </button>

        </div>
      </div>
    </div>
  );
}
