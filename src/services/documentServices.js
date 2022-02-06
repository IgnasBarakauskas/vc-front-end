import axios from "axios"
import config from "./config.json"

const documentApi = `${config.API}documents/`
const documentRowApi = `${config.API}document-rows/`
const getToken = () => {
    return { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }
}

export function createDocument(document) {
    return axios.post(`${documentApi}document`, document, getToken())
}
export function getDocuments(userId) {
    return axios.get(`${documentApi}my-documents/${userId}`, getToken())
}
export function getDocumentRows(documentId) {
    return axios.get(`${documentRowApi}all-document-rows/${documentId}`, {}, getToken())
}
