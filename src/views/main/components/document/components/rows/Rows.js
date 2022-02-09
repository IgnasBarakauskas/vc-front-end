import React from "react"
import DocumentRow from "./DocumentRow"
import DocumentTriplet from "./DocumentTriplet"
import styles from "./Rows.module.css"

const Rows = ({
    documentPrefixes,
    nodes,
    labels,
    items,
    onCreateDocumentRow,
    documentRows,
    onDeleteDocumentRow,
    onSelectDocumentRow,
    selectedDocumentRows,
    onUnselectDocRow,
}) => {
    return (
        <div className={styles.container}>
            <DocumentRow
                onDeleteDocumentRow={onDeleteDocumentRow}
                nodes={nodes}
                documentPrefixes={documentPrefixes}
                items={items}
                documentRows={documentRows}
                labels={labels}
                onCreateDocumentRow={onCreateDocumentRow}
                onSelectDocumentRow={onSelectDocumentRow}
                selectedDocumentRows={selectedDocumentRows}
                onUnselectDocRow={onUnselectDocRow}
            />
            <DocumentTriplet />
        </div>
    )
}

export default Rows
