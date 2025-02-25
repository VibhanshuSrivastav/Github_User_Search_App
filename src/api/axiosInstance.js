import axios from "axios";
const securityToken = import.meta.env.VITE_APP_GITHUB_PAT;
// console.log("This is my Github token:",securityToken);

const githubAxios = axios.create({
    baseURL:"https://api.github.com",
    headers:{
        Authorization:`Bearer ${securityToken}`,
    },
});

export default githubAxios ;