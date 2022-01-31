import axios from "axios"
import config from "./config.json"

const userAPI = `${config.API}users/`

export function userSignUp(user) {
    return axios.post(`${userAPI}signup`, user)
}
export function userSignIn(user) {
    return axios.post(`${userAPI}login`, user)
}
