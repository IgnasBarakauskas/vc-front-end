import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { icon } from ".."
import styles from "./EmptyState.module.css"

const Empty = ({ children }) => {
    return (
        <div className={styles.container}>
            <FontAwesomeIcon className={styles.icon} size="sm" icon={icon.faInfoCircle} />
            {children}
        </div>
    )
}

export default Empty
