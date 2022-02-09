import React, { useEffect, useState } from "react"
import { createDocumentRowConcept } from "../../../../services/documentRowServices"
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
        getDocumentPrefixes(document._id)
            .then((data) => {
                setDocumentPrefixesIds(data.data.rdocumentPrefixes)
            })
            .catch((err) => console.error(err))
    }, [document._id])
    useEffect(() => {
        if (
            Array.isArray(documentPrefixesIds) &&
            Array.isArray(prefixes) &&
            documentPrefixesIds.length > 0 &&
            prefixes.length > 0
        ) {
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
    const handleCreateDocumentRow = (newDocumentRow) => {
        if (newDocumentRow.first_column && newDocumentRow.second_column && newDocumentRow.third_column) {
            createDocumentRowConcept({ ...newDocumentRow, document_id: document._id })
                .then((data) => console.log(data))
                .catch((err) => console.error(err))
        }
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
                onCreateDocumentRow={handleCreateDocumentRow}
                items={items}
                documentPrefixes={documentPrefixes}
                nodes={nodes}
                labels={labels}
            />
        </div>
    )
}

export default Document
