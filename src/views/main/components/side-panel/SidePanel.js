import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CustomButton, icon } from "../../../../common/components"
import styles from "./SidePanel.module.css"
import Footer from "./components/footer/Footer"
import DocumentList from "./components/document-list/DocumentList"

const SidePanel = ({ documents, onAddNewDocument, onDeleteDocument, selectedDocumentIndex }) => {
    const [open, setOpen] = useState(false)
    const [showContent, setShowContent] = useState(false)
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setShowContent(true)
            }, 600)
        } else {
            setShowContent(false)
        }
    }, [open])
    const handleOpen = () => {
        setOpen(!open)
    }
    return (
        <div data-opened={open} className={styles.container}>
            <CustomButton onClick={handleOpen} color="transparent" className={styles.button}>
                <FontAwesomeIcon size="2x" icon={icon.faBars} />
            </CustomButton>
            {open && (
                <div data-open={showContent} className={styles.contentContainer}>
                    <DocumentList
                        selectedDocumentIndex={selectedDocumentIndex}
                        documents={documents}
                        onDeleteDocument={onDeleteDocument}
                    />
                    <Footer onAddNewDocument={onAddNewDocument} open={showContent} />
                </div>
            )}
        </div>
    )
}

export default SidePanel
