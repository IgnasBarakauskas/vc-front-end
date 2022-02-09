import React, { useEffect, useState } from "react"
import {
    createDocumentRowConcept,
    deleteDocumentRow,
    getAllDocumentConcepts,
} from "../../../../services/documentRowServices"
import { getAllItems } from "../../../../services/itemServices"
import { getAllLabels } from "../../../../services/labelServises"
import { getAllNodes } from "../../../../services/nodeServices"
import {
    addPrefixToDocument,
    getAllPrefixes,
    getDocumentPrefixes,
    removePrefixFromDocument,
} from "../../../../services/prefixServices"
import { Rows, Prefix } from "./components"
import styles from "./Document.module.css"

const Document = ({ document }) => {
    const [documentPrefixesIds, setDocumentPrefixesIds] = useState([])
    const [prefixes, setPrefixes] = useState([])
    const [nodes, setNodes] = useState([])
    const [labels, setLabels] = useState([])
    const [items, setItems] = useState([])
    const [documentPrefixes, setDocumentPrefixes] = useState([])
    const [documentRows, setDocumentRows] = useState([])
    const [selectedDocumentRows, setSelectedDocumentRows] = useState([])
    useEffect(() => {
        getAllPrefixes()
            .then((data) => setPrefixes(data.data.prefixes))
            .catch((err) => console.error(err))
        getAllNodes()
            .then((data) => setNodes(data.data.rnodes))
            .catch((err) => console.error(err))
        getAllLabels()
            .then((data) => setLabels(data.data.labels))
            .catch((err) => console.error(err))
        getAllItems()
            .then((data) => setItems(data.data.items))
            .catch((err) => console.error(err))
    }, [])
    useEffect(() => {
        if (document._id) {
            getDocumentPrefixes(document._id)
                .then((data) => {
                    setDocumentPrefixesIds(data.data.rdocumentPrefixes)
                })
                .catch((err) => console.error(err))
            setDocumentRows([])
            getAllDocumentConcepts(document._id)
                .then((data) => {
                    setDocumentRows(data.data.rdocumentRows)
                })
                .catch((err) => console.error(err))
        }
    }, [document._id])

    useEffect(() => {
        if (
            Array.isArray(documentPrefixesIds) &&
            Array.isArray(prefixes) &&
            documentPrefixesIds.length > 0 &&
            prefixes.length > 0
        ) {
            setDocumentPrefixes([])
            documentPrefixesIds.forEach((id) => {
                prefixes.forEach((prefix) => {
                    if (id.rprefix_id === prefix._id) {
                        setDocumentPrefixes((prev) => [...prev, { ...prefix, idOnDoc: id._id }])
                        setPrefixes((prev) => prev.filter((e) => e !== prefix))
                    }
                })
            })
        }
    }, [documentPrefixesIds, prefixes])
    const handleAddPrefix = (prefix) => {
        addPrefixToDocument({ prefix_id: prefix._id, document_id: document._id })
            .then((data) => {
                setDocumentPrefixes((prev) => [...prev, { ...prefix, idOnDoc: data.data._id }])
                setPrefixes((prev) => prev.filter((e) => e !== prefix))
            })
            .catch((err) => console.error(err))
    }
    const handleRemovePrefix = (prefix) => {
        removePrefixFromDocument(prefix.idOnDoc)
            .then(() => {
                setDocumentPrefixes((prev) => prev.filter((e) => e._id !== prefix._id))
                setDocumentPrefixesIds((prev) => prev.filter((e) => e.rprefix_id !== prefix._id))
                setPrefixes((prev) => [...prev, prefix])
            })
            .catch((err) => console.error(err))
    }
    const handleCreateDocumentRow = (firstColumn, secondColumn, thirdColumn) => {
        if (firstColumn._id && secondColumn._id && thirdColumn._id) {
            createDocumentRowConcept({
                first_column: firstColumn._id,
                second_column: secondColumn._id,
                third_column: thirdColumn._id,
                document_id: document._id,
            })
                .then((data) =>
                    setDocumentRows([
                        { ...data.data, rNode: [firstColumn], rLabel: [secondColumn], item: [thirdColumn] },
                        ...documentRows,
                    ])
                )
                .catch((err) => console.error(err))
        }
    }
    const handleDeleteDocumentRow = (documentRowId) => {
        deleteDocumentRow(documentRowId)
            .then(() => documentRows.filter((documentRow) => documentRow._id !== documentRowId))
            .catch((err) => console.error(err))
    }
    const handleSelectDocumentRow = (selectedDocumentRow) => {
        const nullId = selectedDocumentRows.indexOf(null)
        if (
            Array.isArray(selectedDocumentRows) &&
            !selectedDocumentRows.includes(selectedDocumentRow) &&
            (selectedDocumentRows.length < 3 || nullId >= 0)
        ) {
            if (nullId >= 0) {
                const newSelectedDocRows = [...selectedDocumentRows]
                newSelectedDocRows[nullId] = selectedDocumentRow
                setSelectedDocumentRows(newSelectedDocRows)
            } else {
                setSelectedDocumentRows([...selectedDocumentRows, selectedDocumentRow])
            }
        }
    }
    const handleUnselectDocRow = (selectedDocumentRow) => {
        setSelectedDocumentRows(selectedDocumentRows.map((docRow) => (docRow === selectedDocumentRow ? null : docRow)))
    }
    return (
        <div>
            {document?.name && <div className={styles.documentName}>{document.name}</div>}
            <Prefix
                prefixes={prefixes}
                onAddPrefix={handleAddPrefix}
                documentPrefixes={documentPrefixes}
                onRemovePrefix={handleRemovePrefix}
            />
            <Rows
                onDeleteDocumentRow={handleDeleteDocumentRow}
                onCreateDocumentRow={handleCreateDocumentRow}
                items={items}
                documentRows={documentRows}
                documentPrefixes={documentPrefixes}
                nodes={nodes}
                labels={labels}
                onSelectDocumentRow={handleSelectDocumentRow}
                selectedDocumentRows={selectedDocumentRows}
                onUnselectDocRow={handleUnselectDocRow}
            />
        </div>
    )
}

export default Document
