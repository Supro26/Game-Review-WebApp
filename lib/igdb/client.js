import { getIGDBToken } from './auth'

export async function igdbQuery(endpoint, body) {
  const token = await getIGDBToken()

  const response = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
    method: 'POST',
    headers: {
      'Client-ID': process.env.IGDB_CLIENT_ID,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'text/plain',
    },
    body,
  })

  if (!response.ok) throw new Error(`IGDB error: ${response.statusText}`)
  return response.json()
}