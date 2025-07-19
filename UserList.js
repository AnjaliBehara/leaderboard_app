import { UserContext } from '../context/UserContext';
import './UserList.css'; // For basic styling

function UserList() {
    const { users, selectedUser, handleUserSelect, handleClaimPoints, initializeUsers } = useContext(UserContext);

    useEffect(() => {
        // You might want to call initializeUsers once, perhaps with a button or on app startup logic.
        // For demonstration, you could uncomment this, but it will try to initialize every time the component mounts.
        // initializeUsers();
    }, []);
        return (
        <div className="user-list-container">
            <h2>User Selection</h2>
            <button onClick={initializeUsers} className="init-button">Initialize Users (Run Once)</button>
            <div className="user-dropdown">
                <label htmlFor="user-select">Select User:</label>
                <select id="user-select" onChange={(e) => handleUserSelect(e.target.value)} value={selectedUser ? selectedUser._id : ''}>
                    <option value="">--Please choose an option--</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>
                            {user.name} (Current Points: {user.totalPoints})
                        </option>
                    ))}
                </select>
            </div>

            {selectedUser && (
                <div className="selected-user-info">
                    <h3>Selected User: {selectedUser.name}</h3>
                    <p>Current Points: {selectedUser.totalPoints}</p>
                    <button onClick={handleClaimPoints} className="claim-button">Claim Points</button>
                </div>
            )}
        </div>
    );
}

export default UserList;



