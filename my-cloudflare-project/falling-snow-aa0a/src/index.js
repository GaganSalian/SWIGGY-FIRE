export default {
	async fetch(request) {
	  try {
		// Parse the URL to extract query parameters
		const url = new URL(request.url);
		const targetUrl = url.searchParams.get("url"); // Get 'url' parameter
  
		if (!targetUrl) {
		  // Handle missing 'url' parameter
		  return new Response(
			JSON.stringify({ error: "Missing 'url' query parameter" }),
			{
			  status: 400,
			  headers: { "Content-Type": "application/json" },
			}
		  );
		}
  
		// Forward the request to the target URL
		const response = await fetch(targetUrl, {
		  method: request.method,
		  headers: {
			...request.headers, // Forward incoming headers
			Origin: "*", // Allow CORS
		  },
		});
  
		// Prepare headers for CORS
		const headers = new Headers(response.headers);
		headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins
		headers.set("Content-Type", "application/json"); // Set response type to JSON
  
		// Return the response
		return new Response(response.body, {
		  status: response.status,
		  headers,
		});
	  } catch (error) {
		// Handle errors and return error message as JSON
		return new Response(
		  JSON.stringify({ error: "Internal Server Error", details: error.message }),
		  {
			status: 500,
			headers: { "Content-Type": "application/json" },
		  }
		);
	  }
	},
  };
  