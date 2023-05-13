import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:5001/challenge-16684/us-central1/api"               // Here we need to put url of api (here cloud function's url that we created)
})

export default instance