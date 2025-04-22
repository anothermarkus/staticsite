export default {
    async fetch(request, env, ctx) {
      const response = await fetch(request);
      const newHeaders = new Headers(response.headers);
  
      newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
      newHeaders.set("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'");
      newHeaders.set("X-Frame-Options", "SAMEORIGIN");
      newHeaders.set("X-Content-Type-Options", "nosniff");
      newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
      newHeaders.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }
  };
  