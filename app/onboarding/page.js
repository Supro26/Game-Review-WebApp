"use client"

import { useState, useEffect } from "react"
import { createClient } from "../../utils/supabase/client"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }
      // If they already have a username, skip onboarding
      if (user.user_metadata?.username) {
        router.push("/discover")
      }
    }
    check()
  }, [])

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({
      data: { username }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/discover")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-white">One last step!</h1>
        <p className="text-gray-400 text-sm">Pick a username to complete your account.</p>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !username.trim()}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Let's go!"}
        </button>
      </div>
    </div>
  )
}