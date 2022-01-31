import jwt from "jwt-decode"

export function isTokenValid() {
    const token = window.sessionStorage.getItem("token")
    if (!token) {
        return false
    }
    let tokenValue
    try {
        tokenValue = jwt(token)
    } catch (error) {
        tokenValue = undefined
    }
    if (tokenValue && new Date().getTime() / 1000 < tokenValue.exp) {
        return true
    }
    return false
}

export function getUserId() {
    const token = window.sessionStorage.getItem("token")
    if (!token) {
        return null
    }
    let tokenValue
    try {
        tokenValue = jwt(token)
    } catch (error) {
        tokenValue = null
    }
    return tokenValue.userId
}
