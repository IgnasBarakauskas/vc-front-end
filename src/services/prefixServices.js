import axios from "axios"
import config from "./config.json"

const documentPrefixesAPI = `${config.API}document-prefixes/`
const prefixesAPI = `${config.API}prefixes/`
const token = { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }

export function getDocumentPrefixes(documentId) {
    return axios.get(`${documentPrefixesAPI}all-document-prefixes/${documentId}`, token)
}
export function getAllPrefixes() {
    return axios.get(`${prefixesAPI}all-rprefixes`, token)
}
