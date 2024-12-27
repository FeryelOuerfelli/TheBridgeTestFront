import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onCancel, onConfirm, courseTitle }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
        <p className="mb-4">Are you sure you want to delete the course: <strong>{courseTitle}</strong>?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-black rounded-md">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
