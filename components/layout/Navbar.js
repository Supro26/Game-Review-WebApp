"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";

// --- Mock data (replace with real API/DB calls later) ---
const MOCK_RESULTS = [
  { id: 1, type: "game", title: "The Witcher 3", subtitle: "RPG · CD Projekt Red · 2015", href: "/game/witcher-3" },
  { id: 2, type: "game", title: "God of War", subtitle: "Action · Santa Monica Studio · 2018", href: "/game/god-of-war" },
  { id: 3, type: "game", title: "Elden Ring", subtitle: "RPG · FromSoftware · 2022", href: "/game/elden-ring" },
  { id: 4, type: "character", title: "Geralt of Rivia", subtitle: "The Witcher 3", href: "/character/geralt" },
  { id: 5, type: "character", title: "Kratos", subtitle: "God of War", href: "/character/kratos" },
  { id: 6, type: "character", title: "Yennefer", subtitle: "The Witcher 3", href: "/character/yennefer" },
  { id: 7, type: "studio", title: "CD Projekt Red", subtitle: "Studio · Poland", href: "/studio/cd-projekt-red" },
  { id: 8, type: "studio", title: "FromSoftware", subtitle: "Studio · Japan", href: "/studio/fromsoftware" },
];

const TYPE_STYLES = {
  game:      { label: "game",      pill: "bg-green-900/60 text-green-400" },
  character: { label: "character", pill: "bg-purple-900/60 text-purple-400" },
  studio:    { label: "studio",    pill: "bg-yellow-900/60 text-yellow-400" },
};

const FILTERS = ["All", "Games", "Characters", "Studios"];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])
  const wrapperRef = useRef(null);
  const userRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter mock results based on query + active filter
  const filtered = MOCK_RESULTS.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Games" && item.type === "game") ||
      (activeFilter === "Characters" && item.type === "character") ||
      (activeFilter === "Studios" && item.type === "studio");
    return matchesQuery && matchesFilter;
  });

  function handleKeyDown(e) {
    if (e.key === "Enter" && query.trim()) {
      setOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <nav className="w-full bg-black px-8 py-4 flex items-center justify-between border-b border-zinc-800 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-white text-2xl font-bold tracking-widest">
        LOGO
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-10">
      {[
  { href: "/discover",    label: "Discover",    dot: "#748e5e" },
  { href: "/genre",       label: "Genre",       dot: "#c791ad" },
  { href: "/hub",         label: "Hub",         dot: "#cc8a58" },
  { href: "/leaderboard", label: "Leaderboard", dot: "#4c77c1" },
].map(({ href, label, dot }) => (
  <Link
    key={href}
    href={href}
    className={`flex items-center gap-1.5 transition-colors ${
      pathname === href ? "text-white" : "text-zinc-400 hover:text-zinc-200"
    }`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
        pathname === href ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
      style={{
        background: dot,
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    />
    {label}
  </Link>
))}
      </div>
      {/* Right Side — Search + User */}
      <div className="flex items-center gap-4">

        {/* Search wrapper — positioned so dropdown anchors to it */}
        <div ref={wrapperRef} className="relative">

          {/* Search bar */}
          <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 gap-2 w-64 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search games, characters…"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-zinc-200 placeholder-zinc-500 outline-none text-sm w-full"
            />
            {query && (
              <button onClick={() => { setQuery(""); setOpen(false); }} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                ✕
              </button>
            )}
          </div>

          {/* Dropdown */}
          {open && query.length > 0 && (
            <div className="absolute right-0 top-full mt-2 w-96 bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl">

              {/* Filter pills */}
              <div className="flex gap-2 px-3 pt-3 pb-2 border-b border-zinc-800">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      activeFilter === f
                        ? "bg-white text-black border-white"
                        : "text-zinc-400 border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="text-zinc-500 text-sm text-center py-6">No results for "{query}"</p>
                ) : (
                  filtered.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors"
                    >
                      {/* Avatar/thumbnail placeholder */}
                      <div className={`shrink-0 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 text-xs ${item.type === "character" ? "w-8 h-8 rounded-full" : "w-8 h-10 rounded"}`}>
                        {item.type === "game" ? "🎮" : item.type === "character" ? "👤" : "🏢"}
                      </div>
                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white font-medium truncate">{item.title}</p>
                        <p className="text-xs text-zinc-500 truncate">{item.subtitle}</p>
                      </div>
                      {/* Type pill */}
                      <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${TYPE_STYLES[item.type].pill}`}>
                        {TYPE_STYLES[item.type].label}
                      </span>
                    </Link>
                  ))
                )}
              </div>

              {/* Footer — go to full results page */}
              {filtered.length > 0 && (
                <div className="border-t border-zinc-800 px-4 py-2.5">
                  <button
                    onClick={() => { setOpen(false); router.push(`/search?q=${encodeURIComponent(query)}`); }}
                    className="text-xs text-zinc-400 hover:text-white transition-colors w-full text-left"
                  >
                    See all results for <span className="text-white font-medium">"{query}"</span> →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

         {/* User Avatar + Dropdown */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => setUserOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 hover:border-zinc-400 transition-colors flex items-center justify-center cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </button>

          {userOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl">

              {/* User info header */}
              <div className="px-4 py-3 border-b border-zinc-800">
                <p className="text-white text-sm font-medium">My Account</p>
                <p className="text-zinc-500 text-xs mt-0.5">
                  @{user?.user_metadata?.username ?? "user"}
                </p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <Link href="/user/me" onClick={() => setUserOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  Profile
                </Link>

                <Link href="/user/me/edit" onClick={() => setUserOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L8.814 18.476l-4.072.508.508-4.072L16.862 4.487z" />
                  </svg>
                  Edit profile
                </Link>

                <Link href="/settings" onClick={() => setUserOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  Settings
                </Link>
              </div>

              {/* Divider + Logout */}
              <div className="border-t border-zinc-800 py-1">
                <button
                  onClick={async () => {
                  setUserOpen(false);
                  await supabase.auth.signOut();
                  router.push("/login");
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors w-full text-left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}