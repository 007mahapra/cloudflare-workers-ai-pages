### Step 1: Set up Cloudflare Pages (Frontend)

Cloudflare Pages allows you to easily deploy static sites. Here, we will set up a simple HTML/JavaScript front-end that interacts with an API hosted on Cloudflare Workers.

#### 1.1. Create the front-end structure
You can create a simple HTML file that will serve as your front-end interface.

- **Create the project directory structure:**
  ```
  my-cloudflare-project/
  ├── frontend/
  │   └── index.html
  └── backend/ (This will be for Cloudflare Workers later)
  ```

- **In `frontend/index.html`**:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cloudflare Frontend</title>
  </head>
  <body>
    <h1>Cloudflare Pages & Workers API</h1>
    <button id="fetchData">Fetch Data from API</button>
    <p id="response"></p>

    <script>
      document.getElementById('fetchData').addEventListener('click', async () => {
        const response = await fetch('https://<your-worker-subdomain>.workers.dev/api');
        const data = await response.json();
        document.getElementById('response').innerText = JSON.stringify(data);
      });
    </script>
  </body>
  </html>
  ```

This front-end contains a simple button, and when clicked, it fetches data from the Cloudflare Worker API and displays the response on the page.

#### 1.2. Deploy the frontend to Cloudflare Pages
1. Push this project to a GitHub repository.
2. In the Cloudflare dashboard, go to **Pages**.
3. Create a new project, and link your GitHub repository.
4. Set the **root directory** for Cloudflare Pages as the `frontend` folder.

Cloudflare Pages will deploy this static site.

---

### Step 2: Set up Cloudflare Workers (Backend)

Cloudflare Workers are serverless functions that you can use to run your backend logic, such as APIs. Now, let’s create a simple API that the front end will call.

#### 2.1. Install Wrangler (CLI for Cloudflare Workers)
First, you need the Wrangler CLI to manage Cloudflare Workers.

1. Install `wrangler` globally:
   ```bash
   npm install -g wrangler
   ```

2. Log in to Cloudflare:
   ```bash
   wrangler login
   ```

#### 2.2. Create a Cloudflare Worker
Now let’s create the backend API using Cloudflare Workers.

1. **Navigate to the `backend/` folder** and generate a new Worker:
   ```bash
   wrangler init backend-api --type=javascript
   ```

2. **Edit the worker code** to handle an API endpoint. In `backend-api/src/index.js`:
   ```javascript
   export default {
     async fetch(request) {
       const url = new URL(request.url);
       
       // Handle API route
       if (url.pathname === "/api") {
         return new Response(
           JSON.stringify({ message: "Hello from Cloudflare Workers!" }),
           {
             headers: { "Content-Type": "application/json" },
           }
         );
       }

       return new Response("Not Found", { status: 404 });
     },
   };
   ```

This Cloudflare Worker exposes a simple API that responds to requests at the `/api` endpoint.

#### 2.3. Deploy the Worker
1. Configure the worker by opening `wrangler.toml` and setting the `name` field (e.g., `cloudflare-worker-api`):
   ```toml
   name = "cloudflare-worker-api"
   main = "src/index.js"
   ```

2. Deploy the Worker:
   ```bash
   wrangler publish
   ```

   After publishing, you’ll get a URL for your worker (e.g., `https://<your-worker-subdomain>.workers.dev`).

---

### Step 3: Connect Frontend to Backend

In the `frontend/index.html`, replace `<your-worker-subdomain>` with the actual subdomain of your Cloudflare Worker.

```javascript
fetch('https://<your-worker-subdomain>.workers.dev/api')
```

When you click the button, the front end will make a request to the Worker API, and the API will return a JSON response.

---

### Step 4: Testing

1. Visit your Cloudflare Pages site. It should show a simple page with a button.
2. Click the button, and you should see the API response (e.g., `{"message": "Hello from Cloudflare Workers!"}`) displayed on the page.

---

### Summary
- **Frontend**: A static site hosted on **Cloudflare Pages**.
- **Backend**: A simple API deployed on **Cloudflare Workers**.
- The front-end interacts with the backend using the `/api` endpoint.

This is a basic example, but you can extend this to more complex applications with routes, databases, and more!