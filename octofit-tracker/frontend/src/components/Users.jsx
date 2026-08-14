import React, { useState, useEffect } from 'react';
import { fetchApi, apiEndpoints } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchApi(apiEndpoints.users);
        // Handle both paginated and array responses
        setUsers(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">
                  <strong>Name:</strong> {user.profile.firstName} {user.profile.lastName}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                </p>
                {user.profile.bio && (
                  <p className="card-text">
                    <strong>Bio:</strong> {user.profile.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
