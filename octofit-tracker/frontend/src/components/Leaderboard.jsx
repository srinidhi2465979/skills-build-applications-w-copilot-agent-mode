import React, { useState, useEffect } from 'react';
import { fetchApi, apiEndpoints } from '../api';

export default function Leaderboard() {
  const [period, setPeriod] = useState('weekly');
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true);
        const data = await fetchApi(apiEndpoints.leaderboard(period));
        // Handle both paginated and array responses
        setRankings(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [period]);

  const getMedalEmoji = (ranking) => {
    if (ranking === 1) return '🥇';
    if (ranking === 2) return '🥈';
    if (ranking === 3) return '🥉';
    return '⭐';
  };

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <div className="mb-3">
        <select
          className="form-select"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="allTime">All Time</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Total Calories</th>
              <th>Total Distance (km)</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((entry) => (
              <tr key={entry._id}>
                <td className="fw-bold">
                  {getMedalEmoji(entry.ranking)} #{entry.ranking}
                </td>
                <td>{entry.user?.username || 'Unknown'}</td>
                <td>{entry.totalCalories}</td>
                <td>{entry.totalDistance}</td>
                <td>{entry.totalActivities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
