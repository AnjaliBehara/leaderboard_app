import React from 'react';
import axios from 'axios';

const ClaimButton = ({ selectedUserId, onClaimSuccess }) => {
  const handleClaim = async () => {
    if (!selectedUserId) {
      alert("Please select a user first.");
      return;
    }

    try {
      // Call the backend API to claim points
      const response = await axios.post('http://localhost:5000/api/claim-point', {
        userId: selectedUserId
      });

      // Pass the awarded data to parent to trigger leaderboard update
      if (response.data) {
        onClaimSuccess(response.data); // contains new point, updated rank etc.
      }
    } catch (error) {
      console.error("Error claiming points:", error);
    }
  };

  return (
    <button onClick={handleClaim} className="btn btn-primary">
      Claim
    </button>
  );
};

export default ClaimButton;
