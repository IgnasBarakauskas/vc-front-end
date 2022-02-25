import axios from "axios"
import { getUserId } from "../common/utils"
import config from "./config.json"

const documentApi = `${config.API}documents/`
const documentUsersApi = `${config.API}documents-users/`
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
        `${documentUsersApi}invite`,
        { ...user, user_id: getUserId(), redirect_url: "http://localhost:3000/" },
        getToken()
    )
}
