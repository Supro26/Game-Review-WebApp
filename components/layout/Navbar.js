import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black px-8 py-4 flex items-center justify-between border-b border-zinc-800 sticky top-0 z-50">

      {/* Logo */}
      <Link href="/" className="text-white text-2xl font-bold tracking-widest">
        LOGO
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-10">
        <Link href="/discover" className="text-white hover:text-zinc-400 transition-colors">
          Discover
        </Link>
        <Link href="/genre" className="text-white hover:text-zinc-400 transition-colors">
          Genre
        </Link>
        <Link href="/hub" className="text-white hover:text-zinc-400 transition-colors">
          Hub
        </Link>
        <Link href="/leaderboard" className="text-white hover:text-zinc-400 transition-colors">
          Leaderboard
        </Link>
      </div>

      {/* Right Side — Search + User */}
      <div className="flex items-center gap-4">

        {/* Search Bar */}
        <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 gap-2 w-56">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-zinc-400 placeholder-zinc-500 outline-none text-sm w-full"
          />
        </div>

        {/* User Avatar */}
        <Link href="/user/me">
          <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 hover:border-zinc-400 transition-colors flex items-center justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        </Link>

      </div>
    </nav>
  );
}
