import mongoose from 'mongoose';
import { User, Team, Activity, Leaderboard, Workout } from '../models';
import config from '../config';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI);
    console.log('✓ Connected to octofit_db\n');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Database cleared\n');

    // Create sample users
    console.log('Creating users...');
    const users = await User.insertMany([
      {
        username: 'alice_runner',
        email: 'alice@example.com',
        password: 'hashed_password_1',
        profile: {
          firstName: 'Alice',
          lastName: 'Johnson',
          bio: 'Marathon enthusiast',
        },
      },
      {
        username: 'bob_cyclist',
        email: 'bob@example.com',
        password: 'hashed_password_2',
        profile: {
          firstName: 'Bob',
          lastName: 'Smith',
          bio: 'Road cycling lover',
        },
      },
      {
        username: 'carol_swimmer',
        email: 'carol@example.com',
        password: 'hashed_password_3',
        profile: {
          firstName: 'Carol',
          lastName: 'Williams',
          bio: 'Swimming champion',
        },
      },
      {
        username: 'dave_trainer',
        email: 'dave@example.com',
        password: 'hashed_password_4',
        profile: {
          firstName: 'Dave',
          lastName: 'Brown',
          bio: 'Personal trainer',
        },
      },
      {
        username: 'emma_walker',
        email: 'emma@example.com',
        password: 'hashed_password_5',
        profile: {
          firstName: 'Emma',
          lastName: 'Davis',
          bio: 'Daily walker',
        },
      },
    ]);
    console.log(`✓ Created ${users.length} users\n`);

    // Create sample teams
    console.log('Creating teams...');
    const teams = await Team.insertMany([
      {
        name: 'Marathon Maniacs',
        description: 'A team dedicated to long-distance running',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id, users[4]._id],
      },
      {
        name: 'Cycling Crew',
        description: 'For cycling enthusiasts of all levels',
        leader: users[1]._id,
        members: [users[1]._id, users[0]._id],
      },
      {
        name: 'Aqua Athletes',
        description: 'Swimming and water sports team',
        leader: users[2]._id,
        members: [users[2]._id, users[3]._id],
      },
    ]);
    console.log(`✓ Created ${teams.length} teams\n`);

    // Update users with team assignments
    await User.findByIdAndUpdate(users[0]._id, { team: teams[0]._id });
    await User.findByIdAndUpdate(users[1]._id, { team: teams[1]._id });
    await User.findByIdAndUpdate(users[2]._id, { team: teams[2]._id });
    console.log('✓ Assigned users to teams\n');

    // Create sample activities
    console.log('Creating activities...');
    const now = new Date();
    const activities = await Activity.insertMany([
      // Alice's activities
      {
        user: users[0]._id,
        type: 'running',
        duration: 60,
        distance: 10,
        calories: 650,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Morning run',
      },
      {
        user: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 7.5,
        calories: 520,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Evening jog',
      },
      // Bob's activities
      {
        user: users[1]._id,
        type: 'cycling',
        duration: 90,
        distance: 35,
        calories: 850,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Long ride',
      },
      {
        user: users[1]._id,
        type: 'cycling',
        duration: 60,
        distance: 25,
        calories: 650,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Evening cycle',
      },
      // Carol's activities
      {
        user: users[2]._id,
        type: 'swimming',
        duration: 60,
        distance: 2.5,
        calories: 750,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Pool training',
      },
      // Dave's activities
      {
        user: users[3]._id,
        type: 'workout',
        duration: 75,
        calories: 600,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Strength training',
      },
      // Emma's activities
      {
        user: users[4]._id,
        type: 'walking',
        duration: 45,
        distance: 3,
        calories: 200,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Park walk',
      },
    ]);
    console.log(`✓ Created ${activities.length} activities\n`);

    // Create sample workouts
    console.log('Creating workout plans...');
    const workouts = await Workout.insertMany([
      {
        user: users[3]._id,
        title: 'Beginner Full Body',
        description: 'A simple full body workout for beginners',
        exercises: [
          { name: 'Push-ups', sets: 3, reps: 10 },
          { name: 'Squats', sets: 3, reps: 15 },
          { name: 'Plank', sets: 3, reps: 30 },
        ],
        difficulty: 'beginner',
        estimatedDuration: 30,
        suggestedFor: ['full_body', 'beginners'],
      },
      {
        user: users[3]._id,
        title: 'Intermediate Cardio Strength',
        description: 'Mix of cardio and strength training',
        exercises: [
          { name: 'Burpees', sets: 4, reps: 12 },
          { name: 'Dumbbell Lunges', sets: 3, reps: 10, weight: 15 },
          { name: 'Mountain Climbers', sets: 3, reps: 20 },
          { name: 'Deadlifts', sets: 3, reps: 8, weight: 40 },
        ],
        difficulty: 'intermediate',
        estimatedDuration: 45,
        suggestedFor: ['cardio', 'strength'],
      },
      {
        user: users[3]._id,
        title: 'Advanced HIIT',
        description: 'High-intensity interval training for advanced athletes',
        exercises: [
          { name: 'Sprint', sets: 5, reps: 30 },
          { name: 'Box Jumps', sets: 4, reps: 8 },
          { name: 'Kettlebell Swings', sets: 4, reps: 15, weight: 20 },
        ],
        difficulty: 'advanced',
        estimatedDuration: 40,
        suggestedFor: ['hiit', 'advanced'],
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts\n`);

    // Create leaderboard entries (calculate based on activities)
    console.log('Calculating leaderboard rankings...');
    const leaderboardData = [
      {
        user: users[0]._id,
        team: teams[0]._id,
        totalCalories: 1170,
        totalDistance: 17.5,
        totalActivities: 2,
        ranking: 1,
        period: 'weekly' as const,
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        totalCalories: 1500,
        totalDistance: 60,
        totalActivities: 2,
        ranking: 1,
        period: 'weekly' as const,
      },
      {
        user: users[2]._id,
        team: teams[2]._id,
        totalCalories: 750,
        totalDistance: 2.5,
        totalActivities: 1,
        ranking: 2,
        period: 'weekly' as const,
      },
      {
        user: users[3]._id,
        team: teams[2]._id,
        totalCalories: 600,
        totalDistance: 0,
        totalActivities: 1,
        ranking: 3,
        period: 'weekly' as const,
      },
      {
        user: users[4]._id,
        team: teams[0]._id,
        totalCalories: 200,
        totalDistance: 3,
        totalActivities: 1,
        ranking: 4,
        period: 'weekly' as const,
      },
      // All-time leaderboard
      {
        user: users[1]._id,
        team: teams[1]._id,
        totalCalories: 5000,
        totalDistance: 250,
        totalActivities: 25,
        ranking: 1,
        period: 'allTime' as const,
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        totalCalories: 4500,
        totalDistance: 180,
        totalActivities: 20,
        ranking: 2,
        period: 'allTime' as const,
      },
    ];

    await Leaderboard.insertMany(leaderboardData);
    console.log(`✓ Created ${leaderboardData.length} leaderboard entries\n`);

    // Summary
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║       Database Seeding Complete - octofit_db          ║');
    console.log('╠════════════════════════════════════════════════════════╣');
    console.log(`║  Users:       ${users.length}                                                    ║`);
    console.log(`║  Teams:       ${teams.length}                                                    ║`);
    console.log(`║  Activities:  ${activities.length}                                                   ║`);
    console.log(`║  Workouts:    ${workouts.length}                                                    ║`);
    console.log(`║  Rankings:    ${leaderboardData.length}                                                   ║`);
    console.log('╠════════════════════════════════════════════════════════╣');
    console.log('║  Sample Users:                                         ║');
    users.forEach((u) => {
      console.log(`║    • ${u.username} (${u.email})`);
    });
    console.log('╚════════════════════════════════════════════════════════╝\n');

    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed
seedDatabase();
