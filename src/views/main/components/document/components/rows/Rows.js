import React from "react"
import DocumentRow from "./DocumentRow"
import DocumentTriplet from "./DocumentTriplet"
import styles from "./Rows.module.css"

const Rows = ({ documentPrefixes }) => {
    return (
        <div className={styles.container}>
            <DocumentRow documentPrefixes={documentPrefixes} />
            <DocumentTriplet />
        </div>
    )
}

export default Rows
