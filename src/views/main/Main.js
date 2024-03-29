import React, { useEffect, useRef, useState } from "react"
import { MenuItem } from "@mui/material"
import { CustomButton, DropDown } from "../../common/components"
import { SidePanel, Document, RightSidePanel } from "./components"
import styles from "./Main.module.css"
import { getUserId } from "../../common/utils/tokenUtils"
import { getDocuments, createDocument, deleteDocument } from "../../services/documentServices"
import { createPrefix, getAllPrefixes } from "../../services/prefixServices"

const Main = ({ isLogged }) => {
    const [userOpen, setUserOpen] = useState(false)
    const [documents, setDocuments] = useState(null)
    const [selectedRowId, setSelectedRowId] = useState("")
    const [open, setOpen] = useState(false)
    const [prefixes, setPrefixes] = useState([])
    const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(0)
    const anchorRef = useRef(null)

    useEffect(() => {
        window.addEventListener("storage", () => {
            const docId = window.sessionStorage.getItem("docId")
            if (!docId && Array.isArray(documents) && documents.length > 0) {
                window.sessionStorage.setItem("docId", documents[selectedDocumentIndex]._id)
                window.dispatchEvent(new Event("storage"))
            }
        })
        return () => window.dispatchEvent(new Event("storage"))
    }, [selectedDocumentIndex, documents])
    useEffect(() => {
        const docId = window.sessionStorage.getItem("docId")
        if (docId && Array.isArray(documents) && documents.length > 0) {
            documents.forEach((document, index) => {
                if (document._id === docId) {
                    setSelectedDocumentIndex(index)
                }
            })
        }
    }, [documents])
    useEffect(() => {
        getAllPrefixes()
            .then((data) => setPrefixes(data.data.prefixes))
            .catch((err) => console.error(err))
    }, [])

    useEffect(() => {
        const userId = getUserId()
        getDocuments(userId)
            .then((data) => setDocuments(data.data.rdocuments))
            .catch((err) => console.error(err))
    }, [selectedDocumentIndex, isLogged])
    const handleLogOut = () => {
        window.sessionStorage.clear()
        window.dispatchEvent(new Event("storage"))
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setSelectedRowId("")
        setOpen(false)
    }
    const handleUserClose = () => {
        setUserOpen(false)
    }
    const handleUserOpen = () => {
        setUserOpen(!open)
    }
    const handleSelectRow = (rowId) => {
        if (!open) {
            setSelectedRowId(rowId)
            setOpen(true)
        } else {
            setSelectedRowId("")
            setOpen(false)
        }
    }
    const handleInitial = () => {
        const name = window.sessionStorage.getItem("name")
        const spaceIndex = name.indexOf(" ")
        return name.substring(0, 1) + name.substring(spaceIndex + 1, spaceIndex + 2)
    }
    const handleAddNewDocument = (onCloseDialog, setFileNameErr, fileName, fileNameErr) => {
        if (fileName && !fileNameErr) {
            const userId = getUserId()
            createDocument({ name: fileName, user_id: userId, users: [userId] })
                .then((data) => {
                    setDocuments([...documents, data.data])
                    onCloseDialog()
                })
                .catch(() => setFileNameErr("*Server side error ocured"))
        }
    }
    const handleDeleteDocument = (documentId) => {
        const userId = getUserId()
        deleteDocument(documentId, userId)
            .then(() => setDocuments(documents.filter((document) => document._id !== documentId)))
            .catch((err) => console.error(err))
    }
    const handleAddNewPrefix = (handleCloseNodeDialog, prefixName, prefixNameErr, prefixURL, prefixURLErr) => {
        if (prefixName && !prefixNameErr && prefixURL && !prefixURLErr) {
            createPrefix({ name: prefixName, url: prefixURL })
                .then((data) => {
                    setPrefixes([data.data, ...prefixes])
                    handleCloseNodeDialog()
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }
    const handleSelectDocumentIndex = (index) => {
        setSelectedDocumentIndex(index)
        window.sessionStorage.setItem("docId", documents[index]._id)
        window.dispatchEvent(new Event("storage"))
    }

    return (
        <div className={styles.container}>
            <SidePanel
                setSelectedDocumentIndex={handleSelectDocumentIndex}
                documents={documents}
                onAddNewDocument={handleAddNewDocument}
                onDeleteDocument={handleDeleteDocument}
                onAddNewPrefix={handleAddNewPrefix}
                selectedDocumentIndex={selectedDocumentIndex}
            />
            <div className={styles.subContainer}>
                <CustomButton
                    ref={anchorRef}
                    size="lg"
                    className={styles.userButton}
                    color="secondary"
                    onClick={handleUserOpen}
                >
                    {handleInitial()}
                </CustomButton>
                <DropDown ref={anchorRef} open={userOpen} onClose={handleUserClose}>
                    <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
                </DropDown>
                {Array.isArray(documents) && documents.length > 0 && (
                    <Document
                        prefixes={prefixes}
                        setPrefixes={setPrefixes}
                        onSelectRow={handleSelectRow}
                        rdocument={documents[selectedDocumentIndex]}
                    />
                )}
            </div>
            {Array.isArray(documents) && documents.length > 0 && (
                <RightSidePanel
                    selectedRowId={selectedRowId}
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    rdocument={documents[selectedDocumentIndex]}
                />
            )}
        </div>
    )
}

export default Main
