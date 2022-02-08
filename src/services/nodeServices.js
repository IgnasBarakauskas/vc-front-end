import axios from "axios"
import config from "./config.json"

const nodeApi = `${config.API}nodes/`
const getToken = () => {
    return { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }
}

export function createNode(node) {
    return axios.post(`${nodeApi}rnode`, node, getToken())
}
export function getAllNodes() {
    return axios.get(`${nodeApi}all-rnodes`, getToken())
}
