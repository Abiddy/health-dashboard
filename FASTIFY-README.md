# Fastify Server for Health Dashboard

This project now includes a Fastify server to handle the service selection API endpoint separately from the Next.js frontend.

## Setup

1. Make sure you have both the frontend and backend dependencies installed:
   ```
   npm install
   ```

2. Set up your environment variables:
   - Ensure your `.env.local` file includes:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     API_PORT=3001 (optional, defaults to 3001)
     FRONTEND_URL=http://localhost:3000 (optional, defaults to http://localhost:3000)
     ```

## Running the Application

You can run both the Next.js frontend and Fastify backend simultaneously:

```
npm run dev:all
```

Or run them separately:

```
# Start Next.js frontend
npm run dev

# In another terminal, start Fastify backend
npm run server
```

## How It Works

1. The Fastify server runs on port 3001 and provides an API endpoint at `/api/services/select`.

2. The `ServiceSelectionForm` component in the Next.js app sends POST requests to this endpoint.

3. The Fastify server handles authentication through Supabase by passing the cookie headers from the request.

4. When a user selects a service, the Fastify server verifies their authentication, checks if the service exists, and creates a user_service record.

## Authentication

Authentication works by sending the browser's cookies to the Fastify server. The key points are:

1. The `credentials: 'include'` option in the fetch request ensures cookies are sent.

2. The Fastify server passes these cookies to Supabase to authenticate the user.

3. If the user is not authenticated, a 401 Unauthorized error is returned.

## Debugging

If you encounter issues:

1. Check the Fastify server logs in the terminal.

2. Verify that your cookies are being sent properly (check Network tab in browser dev tools).

3. Make sure Supabase Row Level Security (RLS) policies allow the authenticated user to perform the required operations. 