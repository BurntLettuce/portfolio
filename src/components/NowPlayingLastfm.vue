<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { lastfm } from '../data/portfolio.js'

// 'loading' | 'no-proxy' | 'error' | 'ready'
const status = ref('loading')
const track = ref(null)
let pollTimer = null

function relativeTime(unixSeconds) {
  const diff = Date.now() / 1000 - Number(unixSeconds)
  if (diff < 60) return 'just now'
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return Math.floor(diff / 86400) + 'd ago'
}

function bestArtwork(images) {
  if (!Array.isArray(images) || !images.length) return ''
  const found = images.find((i) => i.size === 'extralarge') || images[images.length - 1]
  return found?.['#text'] || ''
}

async function fetchNowPlaying() {
  if (!lastfm.proxyUrl) {
    status.value = 'no-proxy'
    return
  }
  try {
    const res = await fetch(lastfm.proxyUrl)
    if (!res.ok) throw new Error('Proxy request failed: ' + res.status)
    const data = await res.json()
    const t = data?.recenttracks?.track?.[0]
    if (!t) throw new Error('No track data returned')

    track.value = {
      name: t.name,
      artist: t.artist?.name || t.artist?.['#text'] || '',
      album: t.album?.['#text'] || '',
      art: bestArtwork(t.image),
      url: t.url,
      nowPlaying: t['@attr']?.nowplaying === 'true',
      playedAt: t.date?.uts || null,
    }
    status.value = 'ready'
  } catch (err) {
    console.warn('Last.fm proxy fetch failed', err)
    status.value = 'error'
  }
}

function refresh() {
  status.value = track.value ? status.value : 'loading'
  fetchNowPlaying()
}

onMounted(() => {
  fetchNowPlaying()
  pollTimer = setInterval(fetchNowPlaying, 30000)
})
onBeforeUnmount(() => clearInterval(pollTimer))
</script>

<template>
  <div class="lastfm-widget">
    <div class="lf-header">
      <span class="lf-label">Last.fm</span>
      <button type="button" class="lf-refresh" @click="refresh" aria-label="Refresh now playing">&#8635;</button>
    </div>

    <div v-if="status === 'no-proxy'" class="lf-notice">
      Deploy the Cloudflare Worker in <code>/cloudflare-worker</code> and set
      <code>lastfm.proxyUrl</code> in <code>src/data/portfolio.js</code> to show what I'm listening to.
    </div>

    <div v-else-if="status === 'loading'" class="lf-notice">Loading&hellip;</div>

    <div v-else-if="status === 'error'" class="lf-notice">
      Couldn't reach Last.fm right now.
    </div>

    <a
      v-else-if="track"
      class="lf-track"
      :href="track.url"
      target="_blank"
      rel="noopener"
    >
      <div class="lf-art">
        <img v-if="track.art" :src="track.art" :alt="track.album || track.name" />
        <div v-else class="lf-art-placeholder">&#9835;</div>
      </div>
      <div class="lf-meta">
        <span class="lf-status">
          <span v-if="track.nowPlaying" class="lf-dot"></span>
          {{ track.nowPlaying ? 'Scrobbling now' : 'Last played ' + relativeTime(track.playedAt) }}
        </span>
        <span class="lf-title">{{ track.name }}</span>
        <span class="lf-artist">{{ track.artist }}</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.lastfm-widget {
  background: var(--roast);
  border-radius: 4px;
  padding: 14px 16px;
  max-width: 360px;
}

.lf-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.lf-label {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--smoke);
}
.lf-refresh {
  background: transparent;
  border: none;
  color: var(--smoke);
  font-size: 0.95rem;
  line-height: 1;
  padding: 2px 4px;
  cursor: pointer;
  transition: color 0.15s ease, transform 0.4s ease;
}
.lf-refresh:hover { color: var(--gold); transform: rotate(70deg); }

.lf-notice {
  font-size: 0.82rem;
  color: var(--smoke);
  line-height: 1.5;
}
.lf-notice code {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--kraft);
}

.lf-track {
  display: flex;
  gap: 12px;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.lf-art {
  width: 56px;
  height: 56px;
  border-radius: 3px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--roast-light);
}
.lf-art img { width: 100%; height: 100%; object-fit: cover; display: block; }
.lf-art-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--smoke);
  font-size: 1.3rem;
}

.lf-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.lf-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.04em;
  color: var(--blossom);
  text-transform: uppercase;
}
.lf-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blossom);
  box-shadow: 0 0 6px var(--blossom);
  animation: lf-pulse 1.6s ease-in-out infinite;
}
@keyframes lf-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.lf-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  color: var(--cream);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lf-artist {
  font-size: 0.8rem;
  color: var(--smoke);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (prefers-reduced-motion: reduce) {
  .lf-dot { animation: none; opacity: 0.8; }
  .lf-refresh:hover { transform: none; }
}
</style>
