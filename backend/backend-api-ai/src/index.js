/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx) {
// 		return new Response('Hello World!');
// 	},
// };

export default {
	async fetch(request) {
	  const url = new URL(request.url);
  
	  // Handle API route
	  if (url.pathname === "/api") {
		const headers = {
		  "Content-Type": "application/json",
		  "Access-Control-Allow-Origin": "*", // Replace * with specific origin if needed
		  "Access-Control-Allow-Methods": "GET, POST, OPTIONS", 
		  "Access-Control-Allow-Headers": "Content-Type, Authorization",
		};
  
		if (request.method === "OPTIONS") {
		  // Handle preflight request
		  return new Response(null, {
			headers: headers,
		  });
		}
  
		return new Response(
		  JSON.stringify({ message: "Hello from Cloudflare Workers!" }),
		  {
			headers: headers,
		  }
		);
	  }
  
	  return new Response("Not Found", { status: 404 });
	},
  };
  