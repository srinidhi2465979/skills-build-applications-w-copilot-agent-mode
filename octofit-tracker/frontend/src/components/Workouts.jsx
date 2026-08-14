import React, { useState, useEffect } from 'react';
import { fetchApi, apiEndpoints } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const data = await fetchApi(apiEndpoints.workouts);
        // Handle both paginated and array responses
        setWorkouts(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      beginner: 'success',
      intermediate: 'warning',
      advanced: 'danger',
    };
    return (
      <span className={`badge bg-${colors[difficulty] || 'secondary'}`}>
        {difficulty}
      </span>
    );
  };

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workout Plans</h2>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text">{workout.description}</p>
                <p className="card-text">
                  <strong>Difficulty:</strong> {getDifficultyBadge(workout.difficulty)}
                </p>
                <p className="card-text">
                  <strong>Duration:</strong> {workout.estimatedDuration} minutes
                </p>
                {workout.exercises?.length > 0 && (
                  <>
                    <strong>Exercises:</strong>
                    <ul className="mt-2">
                      {workout.exercises.map((exercise, idx) => (
                        <li key={idx}>
                          {exercise.name} - {exercise.sets} sets x {exercise.reps} reps
                          {exercise.weight && ` @ ${exercise.weight}kg`}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
