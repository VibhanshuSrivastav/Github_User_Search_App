    import githubAxios from "../api/axiosInstance";



    export const getUserProfile = async (searchUser) => {
        try {
            const response = githubAxios.get(`https://api.github.com/search/users?q=${searchUser}&_=${Date.now()}`);
            return response
        } catch (error) {
            console.log("Error getting User Profile :", error)
        }
    }

    export const getUserDetails = async (username) => {
        try {
          const response = await githubAxios.get(`https://api.github.com/users/${username}`);
          return response.data;
        } catch (error) {
          console.error("Error fetching user details:", error);
          throw error;
        }
      };
      