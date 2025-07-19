import React, { useState, useEffect, createContext, useContext } from 'react';
import UserList from './components/UserList';
import Leaderboard from './components/Leaderboard';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import './App.css'; // For basic styling

function App() {
    return (
        <UserProvider> {/* Wrap your application with UserProvider */}
            <div className="App">
                <h1>Leaderboard Task</h1>
                <div className="main-content">
                    <UserList />
                    <Leaderboard />
                </div>
            </div>
        </UserProvider>
    );
}

export default App;

