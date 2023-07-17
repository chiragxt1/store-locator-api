# Store Locator API

> An API that helps users store locations on the map.

## Quick Start

Add your MONGO_URI and GEOCODER_API_KEY to the "config/config.env" file.

```bash
# Install dependencies
npm install

# Serve on localhost:5000
npm run dev (nodemon)
or
npm start

# Routes
GET    /api/v1/stores # Get Stores

POST   /api/v1/stores # Add Store
body { storeId: "<id>", address: "<address>" }
```