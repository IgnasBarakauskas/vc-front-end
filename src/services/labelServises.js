import axios from "axios"
import config from "./config.json"

const labelApi = `${config.API}labels/`
const getToken = () => {
    return { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }
}

export function createLabel(label) {
    return axios.post(`${labelApi}rlabel`, label, getToken())
}
export function getAllLabels() {
    return axios.get(`${labelApi}all-rlabels`, getToken())
}
