import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, []);
  console.log(username);
  return (
    <div className="profile-github">
      <h2 className="head center">Github Repos</h2>
      <div className="github-container">
        {repos.length > 0 ? (
          <div className="repos">
            {repos.map((repo) => (
              <div key={repo.id} className="repo">
                <div className="repo-content">
                  <h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}{" "}
                      <i className="fa fa-external-link" aria-hidden="true"></i>
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div className="repo-stats">
                  <div className="repo-stat">{repo.stargazers_count} Stars</div>
                  <div className="repo-stat">
                    {repo.watchers_count} Watchers
                  </div>
                  <div className="repo-stat">{repo.forks_count} Forks</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span id="no-repo">Github profile not provided</span>
        )}
      </div>
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
