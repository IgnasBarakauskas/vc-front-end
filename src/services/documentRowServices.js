import axios from "axios"
import config from "./config.json"

const documentRows = `${config.API}document-rows/`
const getToken = () => {
    return { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }
}

export function createDocumentRowConcept(documentRow) {
    return axios.post(
        `${documentRows}document-row`,
        { ...documentRow, category_id: "61f5c5a322ac99ec1a285fbd" },
        getToken()
    )
}
export function getAllDocumentConcepts(documentId) {
    return axios.get(`${documentRows}all-properties-and-concepts-document-rows/${documentId}`, getToken())
}
