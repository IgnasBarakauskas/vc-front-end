import React, { useEffect, useRef, useState } from "react"
import { MenuItem } from "@mui/material"
import { CustomButton, DropDown } from "../../common/components"
import { SidePanel, Document } from "./components"
import styles from "./Main.module.css"
import { getUserId } from "../../common/utils/tokenUtils"
import { getDocuments } from "../../services/documentServices"

const Main = ({ isLogged }) => {
    const [userOpen, setUserOpen] = useState(false)
    const [documents, setDocuments] = useState(null)
    const [selectedDocumentId] = useState(0)
    const anchorRef = useRef(null)
    useEffect(() => {
        const userId = getUserId()
        getDocuments(userId)
            .then((data) => setDocuments(data.data.rdocuments))
            .catch((err) => console.error(err))
    }, [selectedDocumentId, isLogged])
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
    return (
        <div className={styles.container}>
            <SidePanel documents={documents} />
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
                    <Document document={documents[selectedDocumentId]} />
                )}
            </div>
        </div>
    )
}

export default Main
