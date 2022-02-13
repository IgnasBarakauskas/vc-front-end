import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CircularProgress } from "@mui/material"
import React from "react"
import { icon } from ".."
import styles from "./EmptyState.module.css"

const Empty = ({ children, isLoading = false }) => {
    return (
        (isLoading && (
            <div className={styles.loadingContainer}>
                <CircularProgress size={90} className={styles.loading} />
            </div>
        )) || (
            <div className={styles.container}>
                <FontAwesomeIcon className={styles.icon} size="sm" icon={icon.faInfoCircle} />
                {children}
            </div>
        )
    )
}

export default Empty
