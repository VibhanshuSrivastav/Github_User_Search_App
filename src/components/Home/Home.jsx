import React, { useState } from 'react';
import styles from './styles/Home.module.css';
import { getUserProfile, getUserDetails} from '../../services/home';
import { Link } from 'react-router-dom';
import { IoLogoGithub } from "react-icons/io";

const Home = () => {
  const [searchUser, setSearchUser] = useState("");
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await getUserProfile(searchUser);
      if (data && data.items && data.items.length > 0) {
       
        const usersWithFullDetails = await Promise.all(
          data.items.map(async (user) => {
            try {
              const fullDetails = await getUserDetails(user.login);
              return fullDetails; 
            } catch (err) {
              return user; 
            }
          })
        );
        setUserList(usersWithFullDetails);
        setLoading(false);
        setError(null);
      } else {
        setUserList([]);
        // setLoading(true);
        setError("User not found !!");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("User not found !!");
      setUserList([]);
    }
  };

  
  return (
    <div className={styles.homeContainer}>
      <IoLogoGithub className={styles.githubIcon} />
      <h1 className={styles.heading}>Search Github Users </h1>
      <div className={styles.userSearch}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchUser}
            placeholder="Search Username..."
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn}>Search</button>
        </form>
      </div>
      <div className={styles.cardContainer}>
        {loading ? <p className={styles.loading}></p> : ""}
        {error && <p className={styles.errorMsg}>{error}</p>}
        {userList && userList.length > 0 && userList.map(user => (
          <div key={user.id} className={styles.cardBody}>
            <div className={styles.userImg}>
              <img src={user.avatar_url} alt={user.login} />
            </div>
            <div className={styles.userDetails}>
              <h3>{user.login}</h3>
              <p>Email: {user.email || "Not available"}</p>
              <p>Public Repos: {user.public_repos || "N/A"}</p>
            </div>
            <div className={styles.cardBtn}>
              <button >
                <Link to='/user-profile' className={styles.btnLink} state={{user}}>
                View Repos
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
