import React, { useEffect, useState } from "react"
import { isTokenValid } from "./common/utils"
import styles from "./Root.module.css"
import { Login, Main } from "./views"

const Root = () => {
    const [isLogged, setIsLogged] = useState(isTokenValid())
    const [showLogin, setShowLogin] = useState(!isTokenValid())
    useEffect(() => {
        window.addEventListener("storage", () => {
            const tokenValidity = isTokenValid()
            setIsLogged(tokenValidity)
            if (tokenValidity) {
                setTimeout(() => {
                    setShowLogin(false)
                }, 2000)
            } else {
                setShowLogin(true)
            }
        })
        return () => window.dispatchEvent(new Event("storage"))
    }, [])
    useEffect(() => {
        const { href } = window.location
        const docIdIndex = href.indexOf("document_id=")
        const tokenIndex = href.indexOf("token=")
        const userIdIndex = href.indexOf("user_id=")
        if (docIdIndex > -1 && tokenIndex > -1 && userIdIndex > -1) {
            const docId = href.substring(docIdIndex + 12, tokenIndex - 1)
            const token = href.substring(tokenIndex + 6, userIdIndex - 1)
            const name = href.substring(href.indexOf("name=") + 5).replace("%20", " ")
            window.sessionStorage.setItem("token", token)
            window.sessionStorage.setItem("name", name)
            window.sessionStorage.setItem("docId", docId)
            window.dispatchEvent(new Event("storage"))
            window.history.pushState({}, null, "http://localhost:3000/")
        }
    }, [])

    return (
        <div className={styles.body}>
            {showLogin && <Login open={!isLogged} />}
            {isLogged && <Main />}
        </div>
    )
}

export default Root
