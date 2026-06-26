import Image from "next/image";
import Link from "next/link";

export default function GameCard({ game }) {
  return (
    <Link href={`/game/${game.id}`}>
      <div className="relative w-44 h-60 rounded-2xl overflow-hidden cursor-pointer group">
        {/* Game Cover Image */}
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
          {game.cover ? (
            <Image
              src={game.cover}
              alt={game.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-zinc-600 text-sm">No Image</span>
          )}
        </div>

        {/* Hover Overlay with title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <p className="text-white text-sm font-semibold">{game.title}</p>
        </div>
      </div>
    </Link>
  );
}
