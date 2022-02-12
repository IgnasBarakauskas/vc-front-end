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
    loadingDocRows,
    onCreateDocumentTriplet,
    documentTriplets,
    loadingDocTriplets,
    onDeleteDocumentTriplet,
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
                onCreateDocumentTriplet={onCreateDocumentTriplet}
                onCreateDocumentRow={onCreateDocumentRow}
                onSelectDocumentRow={onSelectDocumentRow}
                selectedDocumentRows={selectedDocumentRows}
                onUnselectDocRow={onUnselectDocRow}
                loadingDocRows={loadingDocRows}
            />
            <DocumentTriplet
                onDeleteDocumentTriplet={onDeleteDocumentTriplet}
                documentTriplets={documentTriplets}
                loadingDocTriplets={loadingDocTriplets}
            />
        </div>
    )
}

export default Rows
