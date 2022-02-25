import React, { useState } from "react"
import {
    CustomButton,
    CustomTextField,
    CustomDialog,
    CustomDialogFooter,
    CustomDialogBody,
    CustomDialogTitle,
    icon,
} from "../../../../../../common/components"
import regex from "../../../../../../common/utils"
import styles from "./Footer.module.css"

const Footer = ({ open, onAddNewDocument }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [fileName, setFileName] = useState("")
    const [fileNameErr, setFileNameErr] = useState("")
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleCloseDialog = () => {
        setFileName("")
        setFileNameErr("")
        setOpenDialog(false)
    }
    const handleFileName = (value) => {
        if (!regex.fileRegex.test(value)) {
            setFileNameErr("*You are using illeagal characters")
        } else {
            setFileNameErr("")
        }
        if (value.length > 90) {
            setFileName(value.substring(0, 90))
        } else {
            setFileName(value)
        }
    }

    return (
        <span>
            <div data-open={open} className={styles.container}>
                <div className={styles.buttonContainer}>
                    <CustomButton
                        className={styles.button}
                        icon={icon.faQuoteRight}
                        size="lg"
                        onClick={handleOpenDialog}
                    >
                        Create Node
                    </CustomButton>
                </div>
                <div className={styles.buttonContainer}>
                    <CustomButton className={styles.button} icon={icon.faFileCode} size="lg" onClick={handleOpenDialog}>
                        Create Document
                    </CustomButton>
                </div>
            </div>
            <CustomDialog open={openDialog} onClose={handleCloseDialog}>
                <CustomDialogTitle onClose={handleCloseDialog}>Create a new document</CustomDialogTitle>
                <CustomDialogBody>
                    <CustomTextField
                        onChange={handleFileName}
                        value={fileName}
                        className={styles.textField}
                        placeholder="Document name"
                    />
                    <span className={styles.errorText}>{fileNameErr}&nbsp;</span>
                </CustomDialogBody>
                <CustomDialogFooter
                    onSubmit={() => onAddNewDocument(handleCloseDialog, setFileNameErr, fileName, fileNameErr)}
                    onClose={handleCloseDialog}
                />
            </CustomDialog>
        </span>
    )
}

export default Footer
