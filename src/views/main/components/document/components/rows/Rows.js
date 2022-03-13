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
    onSelectRow,
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
                onSelectRow={onSelectRow}
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
                onSelectRow={onSelectRow}
                onSelectDocumentRow={onSelectDocumentRow}
                selectedDocumentRows={selectedDocumentRows}
                documentRows={documentRows}
                documentTriplets={documentTriplets}
                loadingDocTriplets={loadingDocTriplets}
                onCreateDocumentTriplet={onCreateDocumentTriplet}
            />
        </div>
    )
}

export default Rows
