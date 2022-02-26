import React, { useEffect, useState } from "react"
import {
    createDocumentRowConcept,
    deleteDocumentRow,
    getAllDocumentConcepts,
    createDocumentRowTriplet,
    getAllDocumentTriplets,
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

const Document = ({ rdocument }) => {
    const [documentPrefixesIds, setDocumentPrefixesIds] = useState([])
    const [prefixes, setPrefixes] = useState([])
    const [nodes, setNodes] = useState([])
    const [labels, setLabels] = useState([])
    const [items, setItems] = useState([])
    const [documentPrefixes, setDocumentPrefixes] = useState([])
    const [documentRows, setDocumentRows] = useState([])
    const [documentTriplets, setDocumentTriplets] = useState([])
    const [selectedDocumentRows, setSelectedDocumentRows] = useState([])
    const [loadingDocRows, setLoadingloadingDocRows] = useState(true)
    const [loadingDocTriplets, setLoadingDocTriplets] = useState(true)
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
        setLoadingloadingDocRows(true)
        setLoadingDocTriplets(true)
        if (rdocument._id) {
            getDocumentPrefixes(rdocument._id)
                .then((data) => {
                    setDocumentPrefixesIds(data.data.rdocumentPrefixes)
                })
                .catch((err) => console.error(err))
                .finally(() => setLoadingDocTriplets(false))
            setDocumentRows([])
            getAllDocumentConcepts(rdocument._id)
                .then((data) => {
                    setDocumentRows(data.data.rdocumentRows)
                })
                .catch((err) => console.error(err))
                .finally(() => setLoadingloadingDocRows(false))
        }
    }, [rdocument._id])

    useEffect(() => {
        if (rdocument._id && Array.isArray(documentRows) && documentRows.length > 0) {
            getAllDocumentTriplets(rdocument._id)
                .then((data) => {
                    setDocumentTriplets(
                        data.data.rdocumentRows.map((documentTriplet) => {
                            const first = documentRows.find((row) => row._id === documentTriplet.row_data.first_column)
                            const second = documentRows.find(
                                (row) => row._id === documentTriplet.row_data.second_column
                            )
                            const third = documentRows.find((row) => row._id === documentTriplet.row_data.third_column)
                            return {
                                ...documentTriplet,
                                row_data: { first_column: first, second_column: second, third_column: third },
                            }
                        })
                    )
                    setLoadingDocTriplets(false)
                })
                .catch((err) => console.error(err))
        }
    }, [rdocument._id, documentRows])
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
        addPrefixToDocument({ prefix_id: prefix._id, document_id: rdocument._id })
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
                document_id: rdocument._id,
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
    const handleCreateDocumentTriplet = () => {
        if (
            Array.isArray(selectedDocumentRows) &&
            selectedDocumentRows.length === 3 &&
            selectedDocumentRows[0]._id &&
            selectedDocumentRows[1]._id &&
            selectedDocumentRows[2]._id
        ) {
            createDocumentRowTriplet({
                first_column: selectedDocumentRows[0]._id,
                second_column: selectedDocumentRows[1]._id,
                third_column: selectedDocumentRows[2]._id,
                document_id: rdocument._id,
            })
                .then((data) => {
                    const first = documentRows.find((row) => row._id === data.data.row_data.first_column)
                    const second = documentRows.find((row) => row._id === data.data.row_data.second_column)
                    const third = documentRows.find((row) => row._id === data.data.row_data.third_column)
                    setDocumentTriplets([
                        { ...data.data, row_data: { first_column: first, second_column: second, third_column: third } },
                        ...documentTriplets,
                    ])
                })
                .catch((err) => console.error(err))
        }
    }
    const handleDeleteDocumentRow = (documentRowId) => {
        deleteDocumentRow(documentRowId)
            .then(() => setDocumentRows(documentRows.filter((documentRow) => documentRow._id !== documentRowId)))
            .catch((err) => console.error(err))
    }
    const handleDeleteDocumentTriplet = (documentRowId) => {
        deleteDocumentRow(documentRowId)
            .then(() =>
                setDocumentTriplets(documentTriplets.filter((documentRow) => documentRow._id !== documentRowId))
            )
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
    const handleGenerate = () => {
        let text = ""
        documentPrefixes.forEach((prefix) => {
            text = `${text}@prefix ${prefix.name} <${prefix.url}> .\n`
        })
        text = `${text}\n`
        documentRows.forEach((docRow) => {
            text = `${text}${docRow.rNode[0].rprefix_id.name}${docRow.rNode[0].name} ${docRow.rLabel[0].rprefix_id.name}${docRow.rLabel[0].name} "${docRow.item[0].name}" .\n`
        })
        text = `${text}\n`
        documentTriplets.forEach((triplet) => {
            text = `${text}${triplet.row_data.first_column.rNode[0].rprefix_id.name}${triplet.row_data.first_column.rNode[0].name} ${triplet.row_data.second_column.rNode[0].rprefix_id.name}${triplet.row_data.second_column.rNode[0].name} ${triplet.row_data.third_column.rNode[0].rprefix_id.name}${triplet.row_data.third_column.rNode[0].name} .\n`
        })
        const element = document.createElement("a")
        element.style.display = "none"
        element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`)
        element.setAttribute("download", `${rdocument.name}.txt`)
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    return (
        <div>
            {rdocument?.name && <div className={styles.documentName}>{rdocument.name}</div>}
            <Prefix
                prefixes={prefixes}
                onAddPrefix={handleAddPrefix}
                documentPrefixes={documentPrefixes}
                onRemovePrefix={handleRemovePrefix}
                onGenerate={handleGenerate}
                disabledGenerate={
                    !(
                        Array.isArray(documentRows) &&
                        documentRows.length > 0 &&
                        Array.isArray(documentTriplets) &&
                        documentTriplets.length > 0 &&
                        Array.isArray(documentPrefixes) &&
                        documentPrefixes.length > 0
                    )
                }
            />
            <Rows
                onDeleteDocumentRow={handleDeleteDocumentRow}
                onCreateDocumentRow={handleCreateDocumentRow}
                items={items}
                documentRows={documentRows}
                documentPrefixes={documentPrefixes}
                nodes={nodes}
                onCreateDocumentTriplet={handleCreateDocumentTriplet}
                labels={labels}
                onSelectDocumentRow={handleSelectDocumentRow}
                selectedDocumentRows={selectedDocumentRows}
                onUnselectDocRow={handleUnselectDocRow}
                documentTriplets={documentTriplets}
                onDeleteDocumentTriplet={handleDeleteDocumentTriplet}
                loadingDocTriplets={loadingDocTriplets}
                loadingDocRows={loadingDocRows}
            />
        </div>
    )
}

export default Document
