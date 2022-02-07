import React from "react"
import DocumentRow from "./DocumentRow"
import DocumentTriplet from "./DocumentTriplet"
import styles from "./Rows.module.css"

const Rows = ({ documentPrefixes, nodes, labels, items, onCreateDocumentRow }) => {
    return (
        <div className={styles.container}>
            <DocumentRow
                nodes={nodes}
                documentPrefixes={documentPrefixes}
                items={items}
                labels={labels}
                onCreateDocumentRow={onCreateDocumentRow}
            />
            <DocumentTriplet />
        </div>
    )
}

export default Rows
