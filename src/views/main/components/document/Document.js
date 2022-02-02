import React, { useEffect, useState } from "react"
import { getAllPrefixes, getDocumentPrefixes } from "../../../../services/prefixServices"
import styles from "./Document.module.css"

const Document = ({ document }) => {
    const [documentPrefixesIds, setDocumentPrefixesIds] = useState(null)
    const [prefixes, setPrefixes] = useState(null)
    // const [documentPrefixes, setDocumentPrefixes] = useState(null)
    useEffect(() => {
        getAllPrefixes()
            .then((data) => setPrefixes(data.data.prefixes))
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
                    if (id !== prefix) {
                        console.log(id._id, "===", prefix._id)
                    }
                })
            })
        }
    }, [documentPrefixesIds, prefixes])
    return <div>{document?.name && <div className={styles.documentName}>{document.name}</div>}</div>
}

export default Document
