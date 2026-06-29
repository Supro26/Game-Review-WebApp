let cachedToken = null
let tokenExpiresAt = 0

export async function getIGDBToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken
  }

  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST' }
  )

  const data = await response.json()
  cachedToken = data.access_token
  tokenExpiresAt = Date.now() + (data.expires_in - 3600) * 1000

  return cachedToken
}