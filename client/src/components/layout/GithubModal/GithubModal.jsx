import React from "react";

const GithubModal = ({ visible, visibleChange }) => {
  console.log(visible);
  return (
    <div
      className="github-modal-container"
      style={visible ? { display: "flex" } : { display: "none" }}
    >
      <div className="github-modal">
        <h2>Star the project on Github</h2>
        <p>
          If you liked the project please consider starring the repository on
          Github
        </p>
        <div className="github-btn-container">
          <a
            href="https://github.com/anshrusia200/DevCon"
            className="github-btn"
            target="_blank"
          >
            ⭐&nbsp; Star Now
          </a>
          <button
            className="github-btn"
            onClick={() => visibleChange(!visible)}
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default GithubModal;
