import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './Leaderboard.css'; // For basic styling

function Leaderboard() {
    const { users } = useContext(UserContext);

    // Leaderboard should display users sorted by totalPoints in descending order
    // The users array from context is already sorted by the backend
    const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            {sortedUsers.length === 0 ? (
                <p>No users on the leaderboard yet. Please initialize users.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User Name</th>
                            <th>Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.map((user, index) => (
                            <tr key={user._id}>
                                                            <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.totalPoints}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Leaderboard;


