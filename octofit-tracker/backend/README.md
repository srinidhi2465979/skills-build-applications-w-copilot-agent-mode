# OctoFit Tracker Backend

This is the Node.js/Express logic tier for the OctoFit Tracker multi-tier application.

## Technology Stack

- **Node.js (LTS)** - Runtime environment
- **Express 4.18.2** - HTTP framework
- **TypeScript 5.1.6** - Type-safe development
- **Mongoose 7.5.0** - MongoDB ODM
- **MongoDB 7.0** - Database (running on port 27017)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── index.ts           # Environment configuration
│   │   └── database.ts        # MongoDB connection
│   ├── models/
│   │   ├── User.ts            # User schema
│   │   ├── Team.ts            # Team schema
│   │   ├── Activity.ts        # Activity schema
│   │   ├── Leaderboard.ts     # Leaderboard schema
│   │   └── Workout.ts         # Workout schema
│   ├── routes/
│   │   ├── users.ts           # User endpoints
│   │   ├── activities.ts      # Activity endpoints
│   │   ├── teams.ts           # Team endpoints
│   │   ├── leaderboard.ts     # Leaderboard endpoints
│   │   └── workouts.ts        # Workout endpoints
│   ├── scripts/
│   │   └── seed.ts            # Database seeding
│   ├── server.ts              # Express configuration
│   └── index.ts               # Entry point
├── dist/                       # Compiled TypeScript
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies
└── .env.example               # Environment template
```

## Database Schema

### Users
```
- username (unique, required)
- email (unique, required, regex validated)
- password (required)
- profile
  - firstName
  - lastName
  - avatar
  - bio
- team (ObjectId reference)
- timestamps (createdAt, updatedAt)
```

### Teams
```
- name (unique, required)
- description
- leader (ObjectId reference to User, required)
- members (array of User ObjectIds)
- timestamps
```

### Activities
```
- user (ObjectId reference, required)
- type (enum: running, cycling, swimming, walking, workout)
- duration (minutes, required)
- distance (km, optional)
- calories (required)
- date (defaults to now)
- notes (optional)
- timestamps
```

### Leaderboard
```
- user (ObjectId reference)
- team (ObjectId reference, nullable)
- totalCalories (default 0)
- totalDistance (default 0)
- totalActivities (default 0)
- ranking (default 0)
- period (enum: weekly, monthly, allTime)
- timestamps
- indexes: (period, ranking), unique (user, period)
```

### Workouts
```
- user (ObjectId reference)
- title (required)
- description
- exercises (array)
  - name (required)
  - sets (required)
  - reps (required)
  - weight (optional)
- difficulty (enum: beginner, intermediate, advanced)
- estimatedDuration (minutes, required)
- suggestedFor (array of strings)
- timestamps
```

## API Endpoints

All endpoints are prefixed with `/api` and return JSON responses.

### Health Check
- `GET /` - API info and available endpoints
- `GET /health` - Service health status

### Users
- `GET /users` - Get all users (excludes password)
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user

### Activities
- `GET /activities` - Get all activities (sorted by date DESC)
- `GET /activities/user/:userId` - Get activities for specific user
- `POST /activities` - Create new activity

### Teams
- `GET /teams` - Get all teams (populated)
- `GET /teams/:id` - Get team by ID
- `POST /teams` - Create new team
- `POST /teams/:id/members` - Add member to team

### Leaderboard
- `GET /leaderboard/:period` - Get rankings for period (weekly/monthly/allTime)
- `GET /leaderboard/:period/:userId` - Get user's ranking in period

### Workouts
- `GET /workouts` - Get all workouts (sorted by date DESC)
- `GET /workouts/user/:userId` - Get workouts for specific user
- `GET /workouts/:id` - Get single workout
- `POST /workouts` - Create new workout

## Environment Configuration

### Required Variables

Set these in `.env` or `.env.local`:

```bash
NODE_ENV=development              # development or production
PORT=8000                          # API server port
MONGODB_URI=mongodb://localhost:27017/octofit_db
CODESPACE_NAME=your-codespace-name # (optional, for Codespaces)
```

### Environment Detection

The server automatically detects:

1. **Codespaces Environment** - Sets `BASE_URL` to `https://{CODESPACE_NAME}-8000.app.github.dev`
2. **Local Development** - Sets `BASE_URL` to `http://localhost:8000`
3. **Production** - Uses `CODESPACE_NAME` or falls back to localhost

## Running the Application

### Install Dependencies

```bash
cd octofit-tracker/backend
npm install
```

### Development Mode

```bash
npm run dev
```

This uses `ts-node` to run TypeScript directly without compilation.

### Production Mode

```bash
npm run build    # Compile TypeScript to dist/
npm start        # Run compiled JavaScript
```

### Seed Database

Populate MongoDB with test data:

```bash
npm run seed
```

This creates:
- 5 users (alice_runner, bob_cyclist, carol_swimmer, dave_trainer, emma_walker)
- 3 teams with members
- 7 activities across users
- 3 workout plans
- 7 leaderboard entries

### Database Management

Check if MongoDB is running:

```bash
ps aux | grep mongod
```

Connect to database with mongosh:

```bash
mongosh mongodb://localhost:27017/octofit_db
```

View collections:

```
show collections
db.users.find()
db.activities.find()
db.teams.find()
```

## API Testing

### Test with curl

```bash
# Get all users
curl http://localhost:8000/api/users

# Get all activities
curl http://localhost:8000/api/activities

# Get all teams
curl http://localhost:8000/api/teams

# Get weekly leaderboard
curl http://localhost:8000/api/leaderboard/weekly

# Get all workouts
curl http://localhost:8000/api/workouts
```

### Test with API Client

Use Postman, Insomnia, or VS Code REST Client to test endpoints.

## TypeScript Compilation

### Watch Mode

Auto-compile TypeScript on file changes:

```bash
npm run watch
```

### Build Production

```bash
npm run build
```

Output directory: `dist/`

### Development

All source files are in `src/`, compiled output goes to `dist/`.

## Error Handling

All endpoints return structured JSON responses:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Codespaces Deployment

### Setup

1. Create or open Codespaces
2. Backend automatically runs on port 8000
3. Set `CODESPACE_NAME` environment variable (auto-detected)
4. Frontend calls backend via: `https://{CODESPACE_NAME}-8000.app.github.dev/api`

### Port Forwarding

- 8000: Public (API tier)
- 27017: Private (Database tier)

## Debugging

### View Server Logs

```bash
# Development
npm run dev

# Check MongoDB
ps aux | grep mongod
tail -f /tmp/mongod.log
```

### Common Issues

1. **Port Already in Use** - Change PORT in .env or kill process on 8000
2. **MongoDB Connection Error** - Ensure MongoDB is running and `mongod` is in PATH
3. **CORS Errors** - Ensure frontend sends correct headers, backend uses middleware
4. **TypeScript Errors** - Run `npm run build` to check compilation

## Git Workflow

All changes on `build-octofit-app` branch:

```bash
git checkout build-octofit-app
git add .
git commit -m "Your message"
git push origin build-octofit-app
```

## Next Steps

1. Add authentication middleware (JWT)
2. Implement input validation and sanitization
3. Add rate limiting
4. Create admin dashboard
5. Add real-time notifications with WebSockets
6. Deploy to production (Heroku, Vercel, AWS)
