export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response(
        JSON.stringify({ error: "Missing `url` parameter." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    try {
      // Construct browser-like headers to avoid target site blocking
      const forwardedAccept = request.headers.get("accept") ||
        "application/json, text/plain, */*";
      const forwardedLang = request.headers.get("accept-language") ||
        "en-US,en;q=0.9";
      const ua =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

      const fetchOptions = {
        method: request.method,
        headers: {
          "User-Agent": ua,
          "Accept": forwardedAccept,
          "Accept-Language": forwardedLang,
          "Referer": "https://www.swiggy.com/",
          "X-Requested-With": "XMLHttpRequest",
        },
      };

      if (request.method !== "GET" && request.method !== "HEAD") {
        // forward body for non-GET requests
        fetchOptions.body = await request.text();
      }

      const response = await fetch(targetUrl, fetchOptions);

      const body = await response.text();

      return new Response(body, {
        status: response.status,
        headers: {
          "Content-Type":
            response.headers.get("content-type") || "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
};
