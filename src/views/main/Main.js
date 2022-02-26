import React, { useEffect, useRef, useState } from "react"
import { MenuItem } from "@mui/material"
import { CustomButton, DropDown } from "../../common/components"
import { SidePanel, Document, RightSidePanel } from "./components"
import styles from "./Main.module.css"
import { getUserId } from "../../common/utils/tokenUtils"
import { getDocuments, createDocument, deleteDocument } from "../../services/documentServices"

const Main = ({ isLogged }) => {
    const [userOpen, setUserOpen] = useState(false)
    const [documents, setDocuments] = useState(null)
    const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(0)
    const anchorRef = useRef(null)

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
    const handleUserClose = () => {
        setUserOpen(false)
    }
    const handleUserOpen = () => {
        setUserOpen(!userOpen)
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

    return (
        <div className={styles.container}>
            <SidePanel
                setSelectedDocumentIndex={setSelectedDocumentIndex}
                documents={documents}
                onAddNewDocument={handleAddNewDocument}
                onDeleteDocument={handleDeleteDocument}
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
                    <Document rdocument={documents[selectedDocumentIndex]} />
                )}
            </div>
            <RightSidePanel />
        </div>
    )
}

export default Main
