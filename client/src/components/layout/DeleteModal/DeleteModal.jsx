import React from "react";

export const DeleteModal = ({
  deleteItemId,
  deleteFunction,
  itemType,
  visible,
  visibleChange,
}) => {
  return (
    <div
      className="github-modal-container "
      style={visible ? { display: "flex" } : { display: "none" }}
    >
      <div className="github-modal delete-popup">
        <h2>Delete {itemType} Confirmation</h2>
        <p>
          Are you sure you want to delete your {itemType} ? This action cannot
          be undone !!
        </p>
        <div className="github-btn-container">
          <button
            className="github-btn delete-popup-btn"
            target="_blank"
            onClick={() => deleteFunction(deleteItemId)}
          >
            Delete
          </button>
          <button
            className="github-btn delete-cancel"
            onClick={() => visibleChange(!visible)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
