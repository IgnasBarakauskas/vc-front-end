import axios from "axios"
import config from "./config.json"

const documentApi = `${config.API}documents/`
const token = { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }

export function createDocument(document) {
    return axios.post(`${documentApi}document`, document, token)
}
export function getDocuments(userId) {
    return axios.get(`${documentApi}my-documents/${userId}`, token)
}
