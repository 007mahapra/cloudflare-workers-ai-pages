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

		
		if (request.method === 'POST') {
			try {
			  // Parse the request body to get the prompt
			  const { prompt } = await request.json();
	  
			  // Send the prompt to the AI model for completion
			  let aiRequest = {
				prompt: prompt,
			  };
	  
			  let aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', aiRequest);
	  
			  // Return the AI response to the frontend
			  return new Response(
				JSON.stringify({ response: aiResponse.completion }),
				{
				  headers: headers,
				}
			  );
			} catch (error) {
			  return new Response(
				JSON.stringify({ error: 'Failed to process the AI request.' }),
				{
				  headers: headers,
				  status: 500,
				}
			  );
			}
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
  