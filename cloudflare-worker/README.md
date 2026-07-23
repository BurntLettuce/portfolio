# Last.fm proxy — Cloudflare
1. Install Wrangler:
   ```
   npm install -g wrangler
   ```
2. From this folder:
   ```
   wrangler login
   ```
3. https://www.last.fm/api/account/create
4. Secrets:
   ```
   wrangler secret put LASTFM_API_KEY
   wrangler secret put ALLOWED_ORIGIN
   ```
   `ALLOWED_ORIGIN`
5. Deploy:
   ```
   wrangler deploy
   ```

## Link

In `src/data/portfolio.js` set:
```js
export const lastfm = {
  username: 'LookItsGhostyy',
  proxyUrl: 'https://lastfm-now-playing-proxy.<your-subdomain>.workers.dev',
}
```
