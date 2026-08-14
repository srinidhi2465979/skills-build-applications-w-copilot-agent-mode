# OctoFit Tracker - Multi-Tier Application

A complete fitness tracking platform with user authentication, activity logging, team management, competitive leaderboards, and personalized workout suggestions.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│          Presentation Tier (React 19 + Vite)               │
│  ├─ Users (Profile Management)                             │
│  ├─ Activities (Workout Logging)                           │
│  ├─ Teams (Team Management)                                │
│  ├─ Leaderboard (Rankings)                                 │
│  └─ Workouts (Workout Plans)                               │
│  Port: 5173 (local) / https://{codespaceName}-5173...     │
└─────────────────────────────────────────────────────────────┘
                          ↓ (HTTP/REST)
┌─────────────────────────────────────────────────────────────┐
│        Logic Tier (Node.js + Express + TypeScript)          │
│  ├─ /api/users (User Management)                           │
│  ├─ /api/activities (Activity Tracking)                    │
│  ├─ /api/teams (Team Management)                           │
│  ├─ /api/leaderboard (Rankings)                            │
│  └─ /api/workouts (Workout Plans)                          │
│  Port: 8000 (local) / https://{codespaceName}-8000...     │
└─────────────────────────────────────────────────────────────┘
                          ↓ (Mongoose ODM)
┌─────────────────────────────────────────────────────────────┐
│          Data Tier (MongoDB + Mongoose)                     │
│  ├─ Users Collection                                       │
│  ├─ Teams Collection                                       │
│  ├─ Activities Collection                                  │
│  ├─ Leaderboard Collection                                 │
│  └─ Workouts Collection                                    │
│  Port: 27017 (private)                                     │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
octofit-tracker/
├── README.md (this file)
├── backend/
│   ├── README.md                    # Backend documentation
│   ├── package.json                 # Dependencies
│   ├── tsconfig.json               # TypeScript config
│   ├── .env.example                # Environment template
│   ├── dist/                       # Compiled output
│   └── src/
│       ├── config/
│       │   ├── index.ts            # Configuration
│       │   └── database.ts         # MongoDB setup
│       ├── models/
│       │   ├── User.ts
│       │   ├── Team.ts
│       │   ├── Activity.ts
│       │   ├── Leaderboard.ts
│       │   └── Workout.ts
│       ├── routes/
│       │   ├── users.ts
│       │   ├── activities.ts
│       │   ├── teams.ts
│       │   ├── leaderboard.ts
│       │   └── workouts.ts
│       ├── scripts/
│       │   └── seed.ts             # Database seeding
│       ├── server.ts               # Express setup
│       └── index.ts                # Entry point
└── frontend/
    ├── README.md                    # Frontend documentation
    ├── package.json                # Dependencies
    ├── vite.config.js             # Vite config
    ├── index.html                 # HTML template
    ├── .env.local                 # Environment (Codespaces)
    ├── dist/                      # Build output
    └── src/
        ├── api.js                 # API client
        ├── App.jsx                # Router & navigation
        ├── main.jsx               # Entry point
        ├── App.css
        ├── index.css
        ├── components/
        │   ├── Users.jsx
        │   ├── Activities.jsx
        │   ├── Teams.jsx
        │   ├── Leaderboard.jsx
        │   └── Workouts.jsx
        └── assets/
```

## Technology Stack

### Frontend (Presentation Tier)
- **React 19.2.8** - UI Framework
- **Vite 8.2.0** - Build Tool
- **react-router-dom 7.18.2** - Client Routing
- **Bootstrap 5.3.8** - CSS Framework

### Backend (Logic Tier)
- **Node.js (LTS)** - Runtime
- **Express 4.18.2** - HTTP Framework
- **TypeScript 5.1.6** - Type Safety
- **Mongoose 7.5.0** - MongoDB ODM
- **ts-node 10.9.1** - TypeScript Execution

### Database (Data Tier)
- **MongoDB 7.0** - NoSQL Database
- **mongosh** - Database Client

## Quick Start

### Prerequisites

- Node.js LTS
- MongoDB (running on port 27017)
- npm or yarn

### 1. Start Backend

```bash
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:8000`

### 2. Seed Database (optional)

```bash
cd backend
npm run seed
```

This creates 5 users, 3 teams, 7 activities, 3 workouts, and leaderboard entries.

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. View in Browser

- **Home**: http://localhost:5173
- **API**: http://localhost:8000/api

## Features

### User Management
- User profiles with names, emails, and bios
- User-to-team associations
- User activity history

### Activity Tracking
- Log workout activities (running, cycling, swimming, walking, workouts)
- Track duration, distance, and calories
- Activity notes and date logging
- Sorted activity feeds

### Team Management
- Create and manage teams
- Assign team leaders
- Add members to teams
- Team-based leaderboards

### Competitive Leaderboard
- Weekly, monthly, and all-time rankings
- Rank by total calories burned
- Track distances and activity counts
- Medal emojis for top 3 positions

### Workout Plans
- Browse pre-made workout plans
- Filter by difficulty level (beginner, intermediate, advanced)
- View exercise details (sets, reps, weight)
- Estimated duration tracking

## API Endpoints Summary

All endpoints return JSON and are prefixed with `/api`:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | / | API info |
| GET | /health | Health check |
| GET | /users | All users |
| GET | /users/:id | User by ID |
| POST | /users | Create user |
| GET | /activities | All activities |
| GET | /activities/user/:id | User activities |
| POST | /activities | Create activity |
| GET | /teams | All teams |
| GET | /teams/:id | Team by ID |
| POST | /teams | Create team |
| POST | /teams/:id/members | Add team member |
| GET | /leaderboard/:period | Rankings |
| GET | /leaderboard/:period/:id | User ranking |
| GET | /workouts | All workouts |
| GET | /workouts/user/:id | User workouts |
| GET | /workouts/:id | Workout by ID |
| POST | /workouts | Create workout |

## Environment Configuration

### Local Development

Create `.env` files in both `backend/` and `frontend/`:

**backend/.env:**
```bash
NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit_db
```

**frontend/.env.local:**
```bash
# Optional - for Codespaces only
# VITE_CODESPACE_NAME=your-codespace-name
```

### Codespaces Deployment

The application automatically detects Codespaces environment:

1. Backend sets `BASE_URL` to `https://{CODESPACE_NAME}-8000.app.github.dev`
2. Frontend uses `VITE_CODESPACE_NAME` to construct API URLs
3. All port forwarding is handled automatically

## Database Seeding

Populate MongoDB with realistic test data:

```bash
cd backend
npm run seed
```

**Creates:**
- 5 Users: alice_runner, bob_cyclist, carol_swimmer, dave_trainer, emma_walker
- 3 Teams: Marathon Maniacs, Cycling Crew, Aqua Athletes
- 7 Activities: Mix of running, cycling, swimming, walking, workouts
- 3 Workouts: Full Body (Beginner), Cardio Strength (Intermediate), HIIT (Advanced)
- 7 Leaderboard Entries: Weekly and all-time rankings

## Running Tests

### API Testing

```bash
# Test backend API
curl http://localhost:8000/api/users
curl http://localhost:8000/api/activities
curl http://localhost:8000/api/teams
curl http://localhost:8000/api/leaderboard/weekly
curl http://localhost:8000/api/workouts
```

### Build Verification

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

## Debugging Tips

### Check Services Status

```bash
# Check MongoDB
ps aux | grep mongod

# Check if port 8000 is in use
lsof -i :8000

# Check if port 5173 is in use
lsof -i :5173
```

### View Logs

```bash
# Backend (development mode)
cd backend
npm run dev

# MongoDB logs
tail -f /tmp/mongod.log
```

### Database Inspection

```bash
# Connect to database
mongosh mongodb://localhost:27017/octofit_db

# View collections
show collections

# View documents
db.users.find()
db.activities.find()
db.teams.find()
```

## Git Workflow

All development is on the `build-octofit-app` branch:

```bash
# Create/switch to branch
git checkout build-octofit-app

# Make changes
# ...

# Commit changes
git add .
git commit -m "Descriptive commit message"

# Push changes
git push origin build-octofit-app
```

## Production Deployment

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
# Deploy dist/ folder to static hosting (Vercel, Netlify, etc)
```

### Environment Variables

Set in deployment platform:

**Backend:**
- `NODE_ENV=production`
- `PORT=8000`
- `MONGODB_URI=<your-production-mongodb-uri>`

**Frontend:**
- `VITE_CODESPACE_NAME=<your-deployment-domain>` (if using Codespaces)

## Troubleshooting

### API Not Found (404)
- Ensure backend is running: `npm run dev` in backend directory
- Check MongoDB is running
- Verify correct port numbers (8000 for API, 5173 for frontend)

### CORS/Connection Errors
- Check both services are running
- Verify network connectivity
- Check browser console for errors

### Database Connection Failed
- Ensure MongoDB is running: `ps aux | grep mongod`
- Check connection string in `.env`
- Verify database `octofit_db` exists

### Frontend Not Loading Data
- Check Network tab in browser DevTools
- Verify API base URL is correct
- Check browser console for errors
- Ensure backend is responding to requests

## Next Steps

1. **Authentication** - Add JWT-based user authentication
2. **Authorization** - Implement role-based access control
3. **Validation** - Add input validation and sanitization
4. **Testing** - Add unit and integration tests
5. **Monitoring** - Add error tracking and logging
6. **Performance** - Add caching and optimization
7. **Real-time** - Implement WebSocket notifications
8. **Deployment** - Set up CI/CD pipeline

## Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [Mongoose ODM](https://mongoosejs.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0)

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or contributions, please open an issue or pull request.
