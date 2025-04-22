import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

export default {
  async fetch(request, env, ctx) {
    try {
      const response = await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
        }
      )

      const headers = new Headers(response.headers)
      headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
      headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'")
      headers.set("X-Frame-Options", "SAMEORIGIN")
      headers.set("X-Content-Type-Options", "nosniff")
      headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
      headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    } catch (e) {
      console.error('Worker error:', e.stack || e)
      return new Response("Internal Error", { status: 500 })
    }
  },
}
