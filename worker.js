async function handleRequest(request) {
    const url = new URL(request.url);
    const path = url.pathname.substring(1) || "index.html"; // Default to index.html
  
    // If the file is not found, return a 404 error
    const filePath = `./dist/${path}`;
  
    try {
      const file = await fetch(filePath);  // Fetch the file from the dist directory
      if (!file.ok) {
        return new Response("Not Found", { status: 404 });
      }
  
      // Fetch the file's content and headers
      const response = await file.text();
  
      const headers = new Headers(file.headers);
      headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
      headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'");
      headers.set("X-Frame-Options", "SAMEORIGIN");
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  
      return new Response(response, { status: 200, headers });
    } catch (error) {
      return new Response("Not Found", { status: 404 });
    }
  }
  
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  