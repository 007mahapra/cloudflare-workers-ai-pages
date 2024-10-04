# To create worker in Cloudflare follow these
```bash
#Install wrangler globally
npm install -g wrangler

# login to cloudflare
wrangler login

# To creaate project for first time <backend-api> is the name of the worker , you can change it
# follow the wizard choose hello world program for simplicity
wrangler init backend-api


# once the project is created, you can swithc to folder and deploy worker
# this will push the code 
npm run deploy
``` 