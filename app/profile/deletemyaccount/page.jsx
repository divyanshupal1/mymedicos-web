"use client"
import React, { useState } from 'react';

function DeleteAccount() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteClick = () => {
    if (confirmDelete) {
        setIsDeleted(true);
    } else {
      alert("Please confirm by checking the box before deleting your account.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      { 
        !isDeleted &&
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-red-600 mb-4">
            Delete Account
          </h2>
          <p className="text-gray-700 text-center mb-6">
            Are you sure you want to delete your account? This action is
            irreversible, and all your data will be permanently removed.
          </p>
          <div className="flex items-center justify-center mb-6">
            <input
              type="checkbox"
              id="confirmDelete"
              className="mr-2"
              checked={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.checked)}
            />
            <label htmlFor="confirmDelete" className="text-gray-700">
              I understand the consequences.
            </label>
          </div>
          <button
            onClick={handleDeleteClick}
            className={`w-full px-4 py-2 font-semibold text-white rounded-lg transition-all ${
              confirmDelete
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-300 cursor-not-allowed"
            }`}
            disabled={!confirmDelete}
          >
            Delete My Account
          </button>
        </div>
      }
      {
        isDeleted &&
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-red-600 mb-4">
            Delete Account
          </h2>
          <p className="text-gray-700 text-center mb-6">
            Thank you for using our service. Your account will be deleted and you will receive a notification in few minutes.
          </p>
        </div>
      }
    </div>
  );
}

export default DeleteAccount;
