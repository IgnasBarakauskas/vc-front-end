import axios from "axios"
import { getUserId } from "../common/utils"
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
export function inviteUser(user) {
    return axios.post(
        `${documentApi}document-users/invite`,
        { ...user, user_id: getUserId(), redirect_url: "http://localhost:3000/" },
        getToken()
    )
}
export function removeUser(documentId, user) {
    return axios.post(
        `${documentApi}manual-document-users/${documentId}`,
        { ...user, user_id: getUserId(), type: "remove" },
        getToken()
    )
}
