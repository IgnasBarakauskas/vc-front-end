import axios from "axios"
import config from "./config.json"

const userAPI = `${config.API}users/`
const getToken = () => {
    return { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }
}

export function userSignUp(user) {
    return axios.post(`${userAPI}signup`, user)
}
export function userSignIn(user) {
    return axios.post(`${userAPI}login`, user)
}
export function getAllUsers() {
    return axios.get(`${userAPI}all-users`, getToken())
}
