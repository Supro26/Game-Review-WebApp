"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// --- Same mock data as Navbar (replace with real API later) ---
const MOCK_RESULTS = [
  { id: 1, type: "game", title: "The Witcher 3", subtitle: "RPG · CD Projekt Red · 2015", href: "/game/witcher-3" },
  { id: 2, type: "game", title: "God of War", subtitle: "Action · Santa Monica Studio · 2018", href: "/game/god-of-war" },
  { id: 3, type: "game", title: "Elden Ring", subtitle: "RPG · FromSoftware · 2022", href: "/game/elden-ring" },
  { id: 4, type: "game", title: "Red Dead Redemption 2", subtitle: "Adventure · Rockstar Games · 2018", href: "/game/rdr2" },
  { id: 5, type: "game", title: "Hollow Knight", subtitle: "Metroidvania · Team Cherry · 2017", href: "/game/hollow-knight" },
  { id: 6, type: "character", title: "Geralt of Rivia", subtitle: "The Witcher 3", href: "/character/geralt" },
  { id: 7, type: "character", title: "Kratos", subtitle: "God of War", href: "/character/kratos" },
  { id: 8, type: "character", title: "Yennefer", subtitle: "The Witcher 3", href: "/character/yennefer" },
  { id: 9, type: "character", title: "Arthur Morgan", subtitle: "Red Dead Redemption 2", href: "/character/arthur-morgan" },
  { id: 10, type: "character", title: "The Knight", subtitle: "Hollow Knight", href: "/character/the-knight" },
  { id: 11, type: "studio", title: "CD Projekt Red", subtitle: "Studio · Poland", href: "/studio/cd-projekt-red" },
  { id: 12, type: "studio", title: "FromSoftware", subtitle: "Studio · Japan", href: "/studio/fromsoftware" },
  { id: 13, type: "studio", title: "Rockstar Games", subtitle: "Studio · USA", href: "/studio/rockstar" },
  { id: 14, type: "studio", title: "Team Cherry", subtitle: "Studio · Australia", href: "/studio/team-cherry" },
];

const TYPE_STYLES = {
  game:      { label: "game",      pill: "bg-green-900/60 text-green-400",   icon: "🎮" },
  character: { label: "character", pill: "bg-purple-900/60 text-purple-400", icon: "👤" },
  studio:    { label: "studio",    pill: "bg-yellow-900/60 text-yellow-400", icon: "🏢" },
};

const TABS = ["All", "Games", "Characters", "Studios"];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("All");

  // Sync query input with URL param
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  function handleKeyDown(e) {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  const filtered = MOCK_RESULTS.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Games" && item.type === "game") ||
      (activeTab === "Characters" && item.type === "character") ||
      (activeTab === "Studios" && item.type === "studio");
    return matchesQuery && matchesTab;
  });

  const counts = {
    All: MOCK_RESULTS.filter(i => i.title.toLowerCase().includes(query.toLowerCase())).length,
    Games: MOCK_RESULTS.filter(i => i.type === "game" && i.title.toLowerCase().includes(query.toLowerCase())).length,
    Characters: MOCK_RESULTS.filter(i => i.type === "character" && i.title.toLowerCase().includes(query.toLowerCase())).length,
    Studios: MOCK_RESULTS.filter(i => i.type === "studio" && i.title.toLowerCase().includes(query.toLowerCase())).length,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Search bar */}
        <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-full px-5 py-3 gap-3 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search games, characters, studios…"
            className="bg-transparent text-white placeholder-zinc-500 outline-none text-base w-full"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-zinc-500 hover:text-zinc-300 transition-colors">
              ✕
            </button>
          )}
        </div>

        {/* Results count + tabs */}
        {query && (
          <>
            <p className="text-zinc-500 text-sm mb-4">
              {counts.All} result{counts.All !== 1 ? "s" : ""} for{" "}
              <span className="text-white font-medium">"{query}"</span>
            </p>

            {/* Tabs */}
            <div className="flex gap-0 border-b border-zinc-800 mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm transition-colors relative ${
                    activeTab === tab
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab}
                  {counts[tab] > 0 && (
                    <span className="ml-1.5 text-xs text-zinc-600">{counts[tab]}</span>
                  )}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Results grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-zinc-600 text-lg mb-2">No {activeTab !== "All" ? activeTab.toLowerCase() : "results"} found</p>
                <p className="text-zinc-700 text-sm">Try a different search or filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filtered.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 hover:border-zinc-600 hover:bg-zinc-800/60 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className={`shrink-0 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-lg ${
                      item.type === "character" ? "w-12 h-12 rounded-full" : "w-10 h-14 rounded-lg"
                    }`}>
                      {TYPE_STYLES[item.type].icon}
                    </div>
                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium text-sm truncate">{item.title}</p>
                      <p className="text-zinc-500 text-xs truncate mt-0.5">{item.subtitle}</p>
                    </div>
                    {/* Type pill */}
                    <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full ${TYPE_STYLES[item.type].pill}`}>
                      {TYPE_STYLES[item.type].label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Empty state — no query yet */}
        {!query && (
          <div className="text-center py-24">
            <p className="text-zinc-600 text-lg">Start typing to search</p>
          </div>
        )}

      </div>
    </div>
  );
}