import axios from "axios"
import config from "./config.json"

const documentRowsApi = `${config.API}document-rows/`
const getToken = () => {
    return { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }
}

export function createDocumentRowConcept(documentRow) {
    return axios.post(
        `${documentRowsApi}document-row`,
        { ...documentRow, category_id: "61f5c5a322ac99ec1a285fbd" },
        getToken()
    )
}
export function createDocumentRowTriplet(documentRow) {
    return axios.post(
        `${documentRowsApi}document-row`,
        { ...documentRow, category_id: "61f5c5b022ac99ec1a285fbf" },
        getToken()
    )
}
export function getAllDocumentConcepts(documentId) {
    return axios.get(`${documentRowsApi}all-properties-and-concepts-document-rows/${documentId}`, getToken())
}
export function getAllDocumentTriplets(documentId) {
    return axios.get(`${documentRowsApi}all-triple-document-rows/${documentId}`, getToken())
}
export function deleteDocumentRow(documentId) {
    return axios.post(`${documentRowsApi}delete-document-row/${documentId}`, {}, getToken())
}
