import Link from "next/link";

const genres = [
  { name: "Action", slug: "action", color: "from-red-900 to-red-950" },
  { name: "RPG", slug: "rpg", color: "from-violet-900 to-violet-950" },
  { name: "Horror", slug: "horror", color: "from-zinc-900 to-black border border-zinc-700" },
  { name: "Soulslike", slug: "soulslike", color: "from-stone-800 to-stone-950" },
  { name: "Shooter", slug: "shooter", color: "from-orange-900 to-orange-950" },
  { name: "Adventure", slug: "adventure", color: "from-emerald-900 to-emerald-950" },
  { name: "Puzzle", slug: "puzzle", color: "from-yellow-900 to-yellow-950" },
  { name: "Strategy", slug: "strategy", color: "from-blue-900 to-blue-950" },
  { name: "Sports", slug: "sports", color: "from-lime-900 to-lime-950" },
  { name: "Sci-Fi", slug: "sci-fi", color: "from-cyan-900 to-cyan-950" },
  { name: "Open World", slug: "open-world", color: "from-teal-900 to-teal-950" },
  { name: "Indie", slug: "indie", color: "from-pink-900 to-pink-950" },
];

export default function GenrePage() {
  return (
    <div className="min-h-screen bg-black text-white px-10 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">Genres</h1>
      </div>

      {/* Genre Grid */}
      <div className="grid grid-cols-4 gap-4">
        {genres.map((genre) => (
          <Link key={genre.slug} href={`/genre/${genre.slug}`}>
            <div className={`bg-gradient-to-br ${genre.color} rounded-2xl h-36 flex items-end p-5 cursor-pointer hover:scale-105 transition-transform duration-200 group`}>
              <h2 className="text-white text-xl font-bold group-hover:translate-x-1 transition-transform duration-200">
                {genre.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
