# OctoFit Tracker Frontend Setup

This is the React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Technology Stack

- **React 19.2.8** - Latest version of React
- **Vite 8.2.0** - Modern build tool and dev server
- **react-router-dom 7.18.2** - Client-side routing and navigation
- **Bootstrap 5.3.8** - Responsive CSS framework

## Features

The frontend provides the following pages:

### 1. **Home** (`/`)
- Welcome page with overview cards
- Quick links to all sections
- API base URL display for debugging

### 2. **Users** (`/users`)
- Display all user profiles
- Show username, name, email, and bio
- Card-based layout with Bootstrap styling

### 3. **Activities** (`/activities`)
- Activity feed with details for all logged workouts
- Display user, activity type, duration, distance, calories, date
- Activity type icons (🏃, 🚴, 🏊, 🚶, 💪)
- Table layout with full activity information

### 4. **Teams** (`/teams`)
- Team roster and management view
- Show team leader and member lists
- Team descriptions and details
- Card-based team display

### 5. **Leaderboard** (`/leaderboard`)
- Competitive rankings with period selection (Weekly, Monthly, All Time)
- Medal emojis for top 3 positions (🥇🥈🥉)
- Display total calories, distance, and activities
- Sorted by ranking

### 6. **Workouts** (`/workouts`)
- Browse workout plans by difficulty (Beginner, Intermediate, Advanced)
- Color-coded difficulty badges
- Exercise details with sets, reps, and weight
- Estimated duration and suggested uses

## Environment Configuration

### Codespaces Setup

For **GitHub Codespaces** deployment, set the `VITE_CODESPACE_NAME` environment variable in `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend will construct API URLs as:
```
https://{CODESPACE_NAME}-8000.app.github.dev/api
```

### Local Development

For **local development**, the `.env.local` file is optional:
- Backend API: `http://localhost:8000/api`
- Frontend: `http://localhost:5173`

If `VITE_CODESPACE_NAME` is not set, the app automatically falls back to localhost.

## Running the Application

### Prerequisites

Ensure the backend is running:

```bash
cd octofit-tracker/backend
npm run dev
```

MongoDB should also be running on port 27017.

### Start Development Server

```bash
cd octofit-tracker/frontend
npm run dev
```

The frontend will be available at:
- **Local**: http://localhost:5173
- **Codespaces**: https://{CODESPACE_NAME}-5173.app.github.dev

### Build for Production

```bash
cd octofit-tracker/frontend
npm run build
```

Output is in the `dist/` directory.

## API Integration

The frontend communicates with the backend via the `api.js` module with automatic Codespaces detection:

- `GET /api/users` - Fetch all users
- `GET /api/activities` - Fetch all activities
- `GET /api/teams` - Fetch all teams
- `GET /api/leaderboard/:period` - Fetch leaderboard rankings
- `GET /api/workouts` - Fetch all workouts

## Debugging

The home page displays the current `API_BASE_URL` for debugging connections.

Check browser console for API errors and verify MongoDB and backend are running.
