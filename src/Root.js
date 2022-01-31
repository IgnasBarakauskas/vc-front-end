import React, { useEffect, useState } from "react"
import { isTokenValid } from "./common/utils"
import styles from "./Root.module.css"
import { Login, Main } from "./views"

const Root = () => {
    const [isLogged, setIsLogged] = useState(isTokenValid())
    useEffect(() => {
        window.addEventListener("storage", () => {
            setIsLogged(isTokenValid())
        })
        window.dispatchEvent(new Event("storage"))
    }, [])

    return <div className={styles.body}>{isLogged ? <Main /> : <Login />} </div>
}

export default Root
