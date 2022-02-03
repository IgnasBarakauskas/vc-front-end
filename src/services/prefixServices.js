import axios from "axios"
import config from "./config.json"

const documentPrefixesAPI = `${config.API}document-prefixes/`
const prefixesAPI = `${config.API}prefixes/`
const getToken = () => {
    return { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }
}

export function getDocumentPrefixes(documentId) {
    return axios.get(`${documentPrefixesAPI}all-document-prefixes/${documentId}`, getToken())
}
export function getAllPrefixes() {
    return axios.get(`${prefixesAPI}all-rprefixes`, getToken())
}
export function addPrefixToDocument(prefix) {
    return axios.post(`${documentPrefixesAPI}document-prefix`, prefix, getToken())
}
export function removePrefixFromDocument(prefixId) {
    return axios.post(`${documentPrefixesAPI}delete-document-prefix/${prefixId}`, {}, getToken())
}
