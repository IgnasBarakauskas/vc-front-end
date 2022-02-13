import axios from "axios"
import config from "./config.json"

const itemApi = `${config.API}items/`
const getToken = () => {
    return { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }
}

export function createItem(item) {
    return axios.post(`${itemApi}item`, item, getToken())
}
export function getAllItems() {
    return axios.get(`${itemApi}all-items`, getToken())
}
