import React from "react"
import styles from "./Root.module.css"
import { Login } from "./views"

const Root = () => {
    return (
        <div className={styles.body}>
            <Login />
        </div>
    )
}

export default Root
