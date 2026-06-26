import Link from "next/link";
import GameCard from "@/components/game/GameCard";

const genreData = {
  action: {
    name: "Action",
    color: "from-red-900 to-red-950",
    description: "Fast-paced games focused on combat, reflexes, and intense gameplay.",
    games: [
      { id: 1, title: "First Light 007", cover: null },
      { id: 10, title: "God of War", cover: null },
      { id: 6, title: "Vergil — DMC5", cover: null },
    ],
  },
  rpg: {
    name: "RPG",
    color: "from-violet-900 to-violet-950",
    description: "Rich story-driven games where you shape your character and the world around you.",
    games: [
      { id: 8, title: "The Witcher 3", cover: null },
      { id: 9, title: "NieR Automata", cover: null },
      { id: 4, title: "Elden Ring", cover: null },
    ],
  },
  horror: {
    name: "Horror",
    color: "from-zinc-900 to-black",
    description: "Terrifying experiences designed to unsettle, scare, and keep you on edge.",
    games: [
      { id: 2, title: "Resident Evil Requiem", cover: null },
      { id: 19, title: "Disco Elysium", cover: null },
    ],
  },
  soulslike: {
    name: "Soulslike",
    color: "from-stone-800 to-stone-950",
    description: "Brutally challenging games that reward patience, skill, and perseverance.",
    games: [
      { id: 4, title: "Elden Ring", cover: null },
      { id: 5, title: "Sekiro", cover: null },
      { id: 11, title: "Dark Souls III", cover: null },
    ],
  },
  shooter: {
    name: "Shooter",
    color: "from-orange-900 to-orange-950",
    description: "Games centered around ranged combat and gunplay mechanics.",
    games: [
      { id: 1, title: "First Light 007", cover: null },
    ],
  },
  adventure: {
    name: "Adventure",
    color: "from-emerald-900 to-emerald-950",
    description: "Exploration-driven games with rich worlds to uncover and stories to experience.",
    games: [
      { id: 7, title: "Red Dead Redemption 2", cover: null },
      { id: 20, title: "Outer Wilds", cover: null },
    ],
  },
  puzzle: {
    name: "Puzzle",
    color: "from-yellow-900 to-yellow-950",
    description: "Games that challenge your mind with clever mechanics and logic.",
    games: [
      { id: 20, title: "Outer Wilds", cover: null },
      { id: 23, title: "Tunic", cover: null },
    ],
  },
  strategy: {
    name: "Strategy",
    color: "from-blue-900 to-blue-950",
    description: "Games that reward careful planning, resource management, and tactical thinking.",
    games: [],
  },
  sports: {
    name: "Sports",
    color: "from-lime-900 to-lime-950",
    description: "Competitive games simulating real-world or fantasy sports experiences.",
    games: [],
  },
  "sci-fi": {
    name: "Sci-Fi",
    color: "from-cyan-900 to-cyan-950",
    description: "Futuristic worlds, space exploration, and technology-driven narratives.",
    games: [
      { id: 9, title: "NieR Automata", cover: null },
      { id: 3, title: "Pragmata", cover: null },
    ],
  },
  "open-world": {
    name: "Open World",
    color: "from-teal-900 to-teal-950",
    description: "Massive games with vast, explorable environments and player-driven freedom.",
    games: [
      { id: 7, title: "Red Dead Redemption 2", cover: null },
      { id: 8, title: "The Witcher 3", cover: null },
      { id: 4, title: "Elden Ring", cover: null },
    ],
  },
  indie: {
    name: "Indie",
    color: "from-pink-900 to-pink-950",
    description: "Independently developed games with unique visions and creative gameplay.",
    games: [
      { id: 19, title: "Disco Elysium", cover: null },
      { id: 20, title: "Outer Wilds", cover: null },
      { id: 21, title: "Pentiment", cover: null },
      { id: 22, title: "Norco", cover: null },
      { id: 23, title: "Tunic", cover: null },
      { id: 24, title: "Omori", cover: null },
    ],
  },
};

export default async function GenreDetailPage({ params }) {
  const { slug } = await params;
  const genre = genreData[slug];

  if (!genre) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 text-lg mb-4">Genre not found</p>
          <Link href="/genre" className="text-white underline text-sm">Back to Genres</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Genre Banner */}
      <div className={`bg-gradient-to-br ${genre.color} px-10 py-14 border-b border-zinc-800`}>
        <Link href="/genre" className="text-zinc-400 text-sm hover:text-white transition-colors mb-4 inline-block">
          ← All Genres
        </Link>
        <h1 className="text-5xl font-bold mb-3">{genre.name}</h1>
        <p className="text-zinc-300 max-w-xl">{genre.description}</p>
      </div>

      {/* Games Grid */}
      <div className="px-10 py-10">
        {genre.games.length > 0 ? (
          <>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">
              {genre.games.length} Games
            </h2>
            <div className="flex flex-wrap gap-5">
              {genre.games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-zinc-600 text-sm">No games added to this genre yet.</p>
        )}
      </div>

    </div>
  );
}
