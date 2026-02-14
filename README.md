# YouTube Playlist Progress Tracker (MERN)

## Tech Stack
- Backend: Node.js, Express, MongoDB, YouTube Data API v3
- Frontend: React (Vite), Axios, Recharts, Tailwind CSS

## Project Structure
- `server/` Express API + MongoDB models
- `client/` React UI

## Environment Variables
Create `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
YT_API_KEY=your_youtube_data_api_key
PORT=5000
```

## Install
From repo root:

```bash
npm install
```

## Run (backend + frontend)

```bash
npm run dev
```

- API: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## API Endpoints
- `POST /api/playlists`
  - body: `{ "name": "My Playlist", "playlistUrl": "https://www.youtube.com/playlist?list=..." }`
- `GET /api/playlists`
- `PATCH /api/playlists/:id/videos/:videoId`
  - body: `{ "completed": true }`

## Build frontend

```bash
npm run build
```

## Production start (server)

```bash
npm run start
```
