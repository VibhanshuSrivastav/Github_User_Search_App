import React, { useEffect, useState } from 'react';
import styles from './styles/UserProfile.module.css';
import { useLocation } from 'react-router-dom';
import { getUserRepos } from '../../services/userProfile';

const UserProfile = () => {
  const [repos, setRepos] = useState([]);
  const { state } = useLocation();
  const { user } = state || {};

  useEffect(() => {
    if (user?.login) {
      const fetchRepos = async () => {
        try {
          const repoData = await getUserRepos(user.login);
          // console.log("repo data is coming::", repoData);
            setRepos(repoData);
        } catch (error) {
          console.log("Error fetching repos ::", error)
        }
      }
      fetchRepos();
      console.log("getting repos :::", fetchRepos());
    }
  }, [user]);

  if (!user) {
    return <div>No user data available</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>

        <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
        <div>

          <h2 className={styles.username}>{user.login}</h2>

          {user.bio && <p className={styles.bio}>{user.bio}</p>}

          <div className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.number}>{user.public_repos}</span>
              <span className={styles.label}>Repos</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.number}>{user.followers}</span>
              <span className={styles.label}>Followers</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.number}>{user.following}</span>
              <span className={styles.label}>Following</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className={styles.repoTitle}>Repositories</h3>
        <ul className={styles.repoList}>
          {repos && repos.length > 0 ? (
            repos.map(repo => (
              <a href={repo.html_url} target="_blank" >
                <li key={repo.id} className={styles.repoItem}>
                  {repo.name}
                </li>
              </a>
            ))
          ) : (
            <>
            <p className={styles.loading}></p>
            {/* <p>No repositories available.</p> */}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
