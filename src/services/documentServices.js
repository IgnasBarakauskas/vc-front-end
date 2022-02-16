import axios from "axios"
import config from "./config.json"

const documentApi = `${config.API}documents/`
const getToken = () => {
    return { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }
}

export function createDocument(document) {
    return axios.post(`${documentApi}document`, document, getToken())
}
export function getDocuments(userId) {
    return axios.get(`${documentApi}my-documents/${userId}`, getToken())
}
export function deleteDocument(documentid, userId) {
    return axios.post(`${documentApi}delete-document/${documentid}/${userId}`, {}, getToken())
}
