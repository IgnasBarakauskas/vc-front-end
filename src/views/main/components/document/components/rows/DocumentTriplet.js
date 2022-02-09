import React from "react"
import { EmptyState } from "../../../../../../common/components"
import styles from "./Rows.module.css"

const DocumentTriplet = () => {
    return (
        <div className={styles.subContainer}>
            <EmptyState>There are no document triplets</EmptyState>
        </div>
    )
}

export default DocumentTriplet
