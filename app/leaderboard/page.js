"use client";
import { useState } from "react";
import Link from "next/link";

const topGames = [
  { rank: 1, id: 7, title: "Red Dead Redemption 2", studio: "Rockstar Games", score: "97%", reviews: "284K" },
  { rank: 2, id: 8, title: "The Witcher 3", studio: "CD Projekt Red", score: "96%", reviews: "312K" },
  { rank: 3, id: 10, title: "God of War", studio: "Santa Monica Studio", score: "95%", reviews: "198K" },
  { rank: 4, id: 9, title: "NieR Automata", studio: "PlatinumGames", score: "94%", reviews: "176K" },
  { rank: 5, id: 11, title: "Dark Souls III", studio: "FromSoftware", score: "93%", reviews: "221K" },
  { rank: 6, id: 5, title: "Sekiro", studio: "FromSoftware", score: "93%", reviews: "189K" },
  { rank: 7, id: 19, title: "Disco Elysium", studio: "ZA/UM", score: "92%", reviews: "94K" },
  { rank: 8, id: 20, title: "Outer Wilds", studio: "Mobius Digital", score: "92%", reviews: "78K" },
  { rank: 9, id: 4, title: "Elden Ring", studio: "FromSoftware", score: "91%", reviews: "405K" },
  { rank: 10, id: 1, title: "First Light 007", studio: "IO Interactive", score: "90%", reviews: "142K" },
];

const topCharacters = [
  { rank: 1, id: 1, name: "Arthur Morgan", game: "Red Dead Redemption 2", rating: "97%", reviews: "198K" },
  { rank: 2, id: 2, name: "Kratos", game: "God of War", rating: "97%", reviews: "210K" },
  { rank: 3, id: 3, name: "Geralt of Rivia", game: "The Witcher 3", rating: "96%", reviews: "231K" },
  { rank: 4, id: 4, name: "Joel Miller", game: "The Last of Us", rating: "96%", reviews: "187K" },
  { rank: 5, id: 5, name: "2B", game: "NieR Automata", rating: "95%", reviews: "143K" },
  { rank: 6, id: 6, name: "Vergil", game: "Devil May Cry 5", rating: "95%", reviews: "132K" },
  { rank: 7, id: 7, name: "Sekiro / Wolf", game: "Sekiro", rating: "94%", reviews: "98K" },
  { rank: 8, id: 8, name: "Malenia", game: "Elden Ring", rating: "93%", reviews: "176K" },
  { rank: 9, id: 9, name: "Ellie", game: "The Last of Us II", rating: "92%", reviews: "201K" },
  { rank: 10, id: 10, name: "Dante", game: "Devil May Cry 5", rating: "92%", reviews: "119K" },
];

function RankBadge({ rank }) {
  if (rank === 1) return <span className="text-yellow-400 font-black text-lg w-8 text-center">🥇</span>;
  if (rank === 2) return <span className="text-zinc-300 font-black text-lg w-8 text-center">🥈</span>;
  if (rank === 3) return <span className="text-amber-600 font-black text-lg w-8 text-center">🥉</span>;
  return <span className="text-zinc-500 font-bold text-sm w-8 text-center">{rank}</span>;
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("games");

  return (
    <div className="min-h-screen bg-black text-white px-10 py-10 max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
          🏆 Leaderboard
        </h1>
        <p className="text-zinc-500 text-sm">Community-ranked games and characters</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-zinc-900 border border-zinc-800 rounded-full p-1 w-fit">
        <button
          onClick={() => setActiveTab("games")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            activeTab === "games"
              ? "bg-white text-black"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          🎮 Games
        </button>
        <button
          onClick={() => setActiveTab("characters")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            activeTab === "characters"
              ? "bg-white text-black"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          👤 Characters
        </button>
      </div>

      {/* Games Leaderboard */}
      {activeTab === "games" && (
        <div className="flex flex-col gap-3">
          {topGames.map((game) => (
            <Link key={game.id} href={`/game/${game.id}`}>
              <div className="flex items-center gap-5 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 hover:border-zinc-600 transition-colors cursor-pointer group">

                {/* Rank */}
                <RankBadge rank={game.rank} />

                {/* Cover placeholder */}
                <div className="w-12 h-16 rounded-lg bg-zinc-800 flex-shrink-0 group-hover:bg-zinc-700 transition-colors"></div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm group-hover:text-zinc-300 transition-colors">
                    {game.title}
                  </p>
                  <p className="text-zinc-500 text-xs mt-1">{game.studio}</p>
                </div>

                {/* Reviews */}
                <div className="text-right flex-shrink-0">
                  <p className="text-zinc-500 text-xs">{game.reviews} reviews</p>
                </div>

                {/* Score */}
                <div className="bg-yellow-500 text-black font-bold text-sm px-3 py-1 rounded-full flex-shrink-0">
                  {game.score}
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Characters Leaderboard */}
      {activeTab === "characters" && (
        <div className="flex flex-col gap-3">
          {topCharacters.map((char) => (
            <Link key={char.id} href={`/character/${char.id}`}>
              <div className="flex items-center gap-5 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 hover:border-zinc-600 transition-colors cursor-pointer group">

                {/* Rank */}
                <RankBadge rank={char.rank} />

                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex-shrink-0 group-hover:bg-zinc-700 transition-colors"></div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm group-hover:text-zinc-300 transition-colors">
                    {char.name}
                  </p>
                  <p className="text-zinc-500 text-xs mt-1">{char.game}</p>
                </div>

                {/* Reviews */}
                <div className="text-right flex-shrink-0">
                  <p className="text-zinc-500 text-xs">{char.reviews} reviews</p>
                </div>

                {/* Score */}
                <div className="bg-yellow-500 text-black font-bold text-sm px-3 py-1 rounded-full flex-shrink-0">
                  {char.rating}
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}
