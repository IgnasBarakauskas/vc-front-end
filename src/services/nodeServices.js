import axios from "axios"
import config from "./config.json"

const nodeApi = `${config.API}nodes/`
const getToken = () => {
    return { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }
}

export function createnode(node) {
    return axios.post(`${documentApi}rnodes`, node, getToken())
}
export function getNodes(userId) {
    return axios.get(`${documentApi}all-rnodes/${userId}`, getToken())
}
