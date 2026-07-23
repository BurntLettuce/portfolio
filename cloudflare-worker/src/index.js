export default {
  async fetch(request, env) {
    const cors = corsHeaders(env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors })
    }

    if (!env.LASTFM_API_KEY) {
      return json({ error: 'LASTFM_API_KEY is not set on this Worker' }, 500, cors)
    }

    const username = env.LASTFM_USERNAME || 'LookItsGhostyy'
    const upstream =
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks` +
      `&user=${encodeURIComponent(username)}&api_key=${env.LASTFM_API_KEY}` +
      `&format=json&limit=1&extended=1`

    try {
      const res = await fetch(upstream, {
        headers: {
          'User-Agent': 'brandonle-portfolio-lastfm-widget',
        },
        // cache briefly at Cloudflare
        cf: { cacheTtl: 15 },
      })

      if (!res.ok) {
        const detail = await res.text().catch(() => '')
        return json({ error: 'Last.fm request failed: ' + res.status, detail }, 502, cors)
      }

      const data = await res.json()
      return json(data, 200, cors)
    } catch (err) {
      return json({ error: 'Upstream fetch failed' }, 502, cors)
    }
  },
}

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  })
}
