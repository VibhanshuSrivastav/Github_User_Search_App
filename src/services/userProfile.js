
import githubAxios from "../api/axiosInstance";

export const getUserRepos = async (username) => {
  try {
    const response = await githubAxios.get(`https://api.github.com/users/${username}/repos`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching repos:", error);
    throw error;
  }
};