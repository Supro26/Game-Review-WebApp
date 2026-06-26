export default async function CharacterPage({ params }) {
  const { id } = await params;

  // Placeholder character data — will come from DB later
  const character = {
    name: "Arthur Morgan",
    game: "Red Dead Redemption 2",
    role: "Main Protagonist",
    species: "Human",
    faction: "Van der Linde Gang",
    voiceActor: "Roger Clark",
    firstAppearance: "Red Dead Redemption 2 (2018)",
    rating: 97,
    appearsIn: ["Red Dead Redemption 2", "Red Dead Online"],
    tags: ["Best Written", "Most Emotional", "Favorite Protagonist", "Saddest Ending", "Greatest Redemption Arc"],
    communityTitles: ["Most Loved", "Best Cowboy", "Fan Favorite"],
    relatedCharacters: [
      { id: 2, name: "Dutch van der Linde", relation: "Gang Leader" },
      { id: 3, name: "John Marston", relation: "Ally" },
      { id: 4, name: "Micah Bell", relation: "Rival" },
    ],
    reviews: [
      { user: "outlaw_fan", rating: 5, text: "One of the best written protagonists in gaming history. His arc is devastating and beautiful.", likes: 53 },
      { user: "rdr2lover", rating: 5, text: "Arthur's journey made me feel things no game ever has. A masterpiece of storytelling.", likes: 41 },
      { user: "cowboy99", rating: 4, text: "Incredible character. The voice acting alone deserves an award.", likes: 28 },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Profile Card Header */}
      <div className="flex flex-col items-center pt-14 pb-10 px-6 border-b border-zinc-800">

        {/* Portrait */}
        <div className="w-36 h-36 rounded-full bg-zinc-800 border-4 border-zinc-700 flex items-center justify-center mb-5 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>

        {/* Name + Rating */}
        <h1 className="text-4xl font-bold mb-1">{character.name}</h1>
        <p className="text-zinc-400 text-sm mb-4">{character.game}</p>
        <div className="flex items-center gap-2 mb-5">
          <div className="bg-yellow-500 text-black font-bold text-sm px-4 py-1 rounded-full">
            {character.rating}%
          </div>
          <span className="text-zinc-400 text-sm">Community Score</span>
        </div>

        {/* Community Titles */}
        <div className="flex flex-wrap justify-center gap-2">
          {character.communityTitles.map((title) => (
            <span key={title} className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1 rounded-full">
              🏆 {title}
            </span>
          ))}
        </div>

      </div>

      {/* Main Content */}
      <div className="flex gap-8 px-10 py-10 max-w-6xl mx-auto">

        {/* Left — Details + Tags + Reviews */}
        <div className="flex-1">

          {/* Character Info */}
          <div className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-5">Character Info</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Role", value: character.role },
                { label: "Species", value: character.species },
                { label: "Faction", value: character.faction },
                { label: "Voice Actor", value: character.voiceActor },
                { label: "First Appearance", value: character.firstAppearance },
              ].map(({ label, value }) => (
                <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
                  <p className="text-zinc-500 text-xs mb-1">{label}</p>
                  <p className="text-white text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Appears In */}
          <div className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-5">Appears In</h2>
            <div className="flex flex-col gap-3">
              {character.appearsIn.map((game) => (
                <div key={game} className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 cursor-pointer hover:border-zinc-600 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex-shrink-0"></div>
                  <p className="text-white text-sm font-medium">{game}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Community Tags */}
          <div className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-5">Community Tags</h2>
            <div className="flex flex-wrap gap-2">
              {character.tags.map((tag) => (
                <span key={tag} className="text-sm bg-zinc-900 border border-zinc-700 hover:border-zinc-400 text-zinc-300 px-4 py-2 rounded-full cursor-pointer transition-colors">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Community Reviews */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-5">Community Reviews</h2>
            <div className="flex flex-col gap-6">
              {character.reviews.map((review, i) => (
                <div key={i} className="flex gap-4 py-5 border-b border-zinc-800">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">{review.user}</span>
                      <span className="text-yellow-400 text-sm">{"★".repeat(review.rating)}</span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">{review.text}</p>
                    <button className="text-zinc-500 hover:text-white text-xs mt-1 text-left transition-colors">
                      👍 Helpful ({review.likes})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar — Related Characters */}
        <div className="w-64 flex-shrink-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-5">Related Characters</h2>
          <div className="flex flex-col gap-4">
            {character.relatedCharacters.map((rel) => (
              <a href={`/character/${rel.id}`} key={rel.id} className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 hover:border-zinc-600 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex-shrink-0"></div>
                <div>
                  <p className="text-white text-sm font-semibold">{rel.name}</p>
                  <p className="text-zinc-500 text-xs">{rel.relation}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
