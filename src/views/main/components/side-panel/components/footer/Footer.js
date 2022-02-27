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

const urlRegex = new RegExp(regex.urlRegex)

const Footer = ({ open, onAddNewDocument, onAddNewPrefix }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [openNodeDialog, setOpenNodeDialog] = useState(false)
    const [fileName, setFileName] = useState("")
    const [prefixName, setPrefixName] = useState("")
    const [prefixNameErr, setPrefixNameErr] = useState("")
    const [prefixURL, setPrefixURL] = useState("")
    const [prefixURLErr, setPrefixURLErr] = useState("")
    const [fileNameErr, setFileNameErr] = useState("")
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleOpenNodeDialog = () => {
        setOpenNodeDialog(true)
    }
    const handleCloseNodeDialog = () => {
        setOpenNodeDialog(false)
        setPrefixName("")
        setPrefixNameErr("")
        setPrefixURL("")
        setPrefixURLErr("")
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
    const handlePrefixName = (value) => {
        if (value.length > 5) {
            setPrefixNameErr("* Prefix name is too long")
        } else if (value[value.length - 1] !== ":") {
            setPrefixNameErr("* Prefix name must end with:")
        } else {
            setPrefixNameErr("")
        }
        setPrefixName(value)
    }
    const handlePrefixURL = (value) => {
        if (!value.match(urlRegex)) {
            setPrefixURLErr("* URL is not valid")
        } else {
            setPrefixURLErr("")
        }
        setPrefixURL(value)
    }

    return (
        <span>
            <div data-open={open} className={styles.container}>
                <div className={styles.buttonContainer}>
                    <CustomButton
                        className={styles.button}
                        icon={icon.faQuoteRight}
                        size="lg"
                        onClick={handleOpenNodeDialog}
                    >
                        Create Prefix
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
            <CustomDialog open={openNodeDialog} onClose={handleCloseNodeDialog}>
                <CustomDialogTitle onClose={handleCloseNodeDialog}>Create a new prefix</CustomDialogTitle>
                <CustomDialogBody>
                    <CustomTextField
                        onChange={handlePrefixName}
                        value={prefixName}
                        className={styles.textField}
                        placeholder="Prefix name"
                    />
                    <span className={styles.errorText}>{prefixNameErr}&nbsp;</span>
                    <CustomTextField
                        onChange={handlePrefixURL}
                        value={prefixURL}
                        className={styles.textField}
                        placeholder="Prefix url"
                    />
                    <span className={styles.errorText}>{prefixURLErr}&nbsp;</span>
                </CustomDialogBody>
                <CustomDialogFooter
                    onSubmit={() =>
                        onAddNewPrefix(handleCloseNodeDialog, prefixName, prefixNameErr, prefixURL, prefixURLErr)
                    }
                    onClose={handleCloseNodeDialog}
                />
            </CustomDialog>
        </span>
    )
}

export default Footer
