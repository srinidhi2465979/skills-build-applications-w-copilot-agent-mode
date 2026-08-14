import React, { useState, useEffect } from 'react';
import { fetchApi, apiEndpoints } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchApi(apiEndpoints.teams);
        // Handle both paginated and array responses
        setTeams(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-6 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{team.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{team.description}</p>
                <p className="card-text">
                  <strong>Leader:</strong> {team.leader?.username || 'Unknown'}
                </p>
                <p className="card-text">
                  <strong>Members ({team.members?.length || 0}):</strong>
                </p>
                <ul>
                  {team.members?.map((member) => (
                    <li key={member._id}>{member.username}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
