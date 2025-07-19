export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    // Get query parameters
    const { input } = req.query

    // Forward request to EmuReady API
    const response = await fetch(
      `https://www.emuready.com/api/trpc/mobile.getListings?batch=1&input=${input}`,
      {
        headers: {
          'User-Agent': 'Eden-Emulator-Website/1.0',
        },
      },
    )

    const data = await response.json()

    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching from EmuReady:', error)
    res.status(500).json({ error: 'Failed to fetch compatibility data' })
  }
}
