import GameCard from "@/components/game/GameCard";
import Link from "next/link";
import { Flame, Star, GamepadDirectional, Gem, CircleStar } from "lucide-react";

const trendingGames = [
  { id: 1, title: "First Light 007", cover: null },
  { id: 2, title: "Resident Evil Requiem", cover: null },
  { id: 3, title: "Pragmata", cover: null },
  { id: 4, title: "Elden Ring", cover: null },
  { id: 5, title: "Sekiro", cover: null },
  { id: 6, title: "Bloodborne", cover: null },
];

const topRatedGames = [
  { id: 7, title: "Red Dead Redemption 2", cover: null },
  { id: 8, title: "The Witcher 3", cover: null },
  { id: 9, title: "NieR Automata", cover: null },
  { id: 10, title: "God of War", cover: null },
  { id: 11, title: "Dark Souls III", cover: null },
  { id: 12, title: "Hollow Knight", cover: null },
];

const recentlyReleased = [
  { id: 13, title: "Game A", cover: null },
  { id: 14, title: "Game B", cover: null },
  { id: 15, title: "Game C", cover: null },
  { id: 16, title: "Game D", cover: null },
  { id: 17, title: "Game E", cover: null },
  { id: 18, title: "Game F", cover: null },
];

const topCharacters = [
  { id: 1, name: "Arthur Morgan", game: "RDR2", rating: 97 },
  { id: 2, name: "Kratos", game: "God of War", rating: 97 },
  { id: 3, name: "Geralt", game: "The Witcher 3", rating: 96 },
  { id: 4, name: "Joel Miller", game: "The Last of Us", rating: 96 },
  { id: 5, name: "2B", game: "NieR Automata", rating: 95 },
  { id: 6, name: "Vergil", game: "DMC5", rating: 95 },
];

const studios = [
  { id: 1, name: "Ubisoft" },
  { id: 2, name: "Rockstar" },
  { id: 3, name: "CD Projekt Red" },
  { id: 4, name: "FromSoftware" },
  { id: 5, name: "Santa Monica" },
  { id: 6, name: "Capcom" },
  { id: 7, name: "Naughty Dog" },
  { id: 8, name: "PlatinumGames" },
];

const hiddenGems = [
  { id: 19, title: "Disco Elysium", cover: null },
  { id: 20, title: "Outer Wilds", cover: null },
  { id: 21, title: "Pentiment", cover: null },
  { id: 22, title: "Norco", cover: null },
  { id: 23, title: "Tunic", cover: null },
  { id: 24, title: "Omori", cover: null },
];

function SectionHeader({ emoji, title }) {
  return (
    <h2 className="text-xl font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
      {emoji && <span>{emoji}</span>}
      {title}
    </h2>
  );
}

function GameRow({ games }) {
  return (
    <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
      {games.map((game) => (
        <div key={game.id} className="flex-shrink-0">
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Left / Main Section */}
      <div className="flex-1 px-10 py-8 overflow-hidden">

        {/* Trending */}
        <div className="mb-12">
          <div className="flex gap-1">
          <Flame color="#7d2428" strokeWidth={2.15}/>
          <SectionHeader title="Trending" />
          </div>
          <GameRow games={trendingGames} />
        </div>

        {/* Top Rated */}
        <div className="mb-12">
          <div className="flex gap-1">
          <Star color="#ad8a08" strokeWidth={1.75} />
          <SectionHeader title="Top Rated" />
          </div>
          <GameRow games={topRatedGames} />
        </div>

        {/* Recently Released */}
        <div className="mb-12">
          <div className="flex gap-1">
          <GamepadDirectional size={26} color="#3f8f6a" strokeWidth={1.75} />
          <SectionHeader title="Recently Released" />
          </div>
          <GameRow games={recentlyReleased} />
        </div>

        {/* Hidden Gems */}
        <div className="mb-12">
          <div className="flex gap-1">
          <Gem size={26} color="#567aa7" strokeWidth={1.75} />
          <SectionHeader title="Hidden Gems" />
          </div>
          <GameRow games={hiddenGems} />
        </div>

        {/* Studios */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1 h-5 bg-yellow-500 rounded-full inline-block"></span>
            <h2 className="text-xl font-bold tracking-widest uppercase">Studios</h2>
          </div>
          <div className="flex gap-5 flex-wrap">
            {studios.map((studio) => (
              <Link key={studio.id} href={`/studio/${studio.id}`}>
                <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400 text-center px-1 hover:border-zinc-400 hover:text-white cursor-pointer transition-all duration-200">
                  {studio.name}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="w-px bg-zinc-800 my-8"></div>

      {/* Right Sidebar */}
      <div className="w-72 px-8 py-8 flex-shrink-0">

        {/* Top Rated Characters */}
        <div className="mb-10">
          <h2 className="text-lg font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
            Top Rated Character <span className="text-green-400">↗</span>
          </h2>
          <div className="flex flex-col gap-6">
            {topCharacters.map((char) => (
              <Link key={char.id} href={`/character/${char.id}`}>
                <div className="flex items-center gap-4 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 group-hover:border-zinc-400 transition-colors flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-semibold text-sm group-hover:text-zinc-300 transition-colors">
                      {char.name}
                    </p>
                    <p className="text-zinc-500 text-xs">{char.game}</p>
                    <p className="text-zinc-400 text-xs">{char.rating}%</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-800 mb-10"></div>

        {/* Top Studios in sidebar */}
        <div>
          <h2 className="text-lg font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
            Top Studios <CircleStar color="#633468" strokeWidth={1.75} />
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { name: "FromSoftware", id: 4 },
              { name: "Rockstar Games", id: 2 },
              { name: "Naughty Dog", id: 7 },
              { name: "Santa Monica", id: 5 },
              { name: "Capcom", id: 6 },
            ].map((studio, i) => (
              <Link key={studio.id} href={`/studio/${studio.id}`}>
                <div className="flex items-center gap-3 cursor-pointer group">
                  <span className="text-zinc-600 text-sm w-4">{i + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 group-hover:border-zinc-400 transition-colors flex-shrink-0"></div>
                  <p className="text-zinc-400 text-sm group-hover:text-white transition-colors">
                    {studio.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
