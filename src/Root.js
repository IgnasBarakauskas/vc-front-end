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

    return (
        <div className={styles.body}>
            {showLogin && <Login open={!isLogged} />}
            {isLogged && <Main />}
        </div>
    )
}

export default Root
