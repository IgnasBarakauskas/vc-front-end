import axios from "axios"
import config from "./config.json"
import { getUserId } from "../common/utils"

const commentApi = `${config.API}comments/`
const getToken = () => {
    return { headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` } }
}

export function createComment(comment) {
    return axios.post(`${commentApi}comment`, { ...comment, user_id: getUserId() }, getToken())
}
export function deleteComment(commentId) {
    return axios.post(`${commentApi}delete-comment/${commentId}`, {}, getToken())
}
export function getComments(rowId) {
    return axios.get(`${commentApi}all-document-comments/${rowId}`, getToken())
}
export function getRowComments(rowId) {
    return axios.get(`${commentApi}all-document-row-comments/${rowId}`, getToken())
}
