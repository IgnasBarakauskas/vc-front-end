import { DialogContent } from "@mui/material"
import React from "react"
import styles from "./CustomDialogBody.module.css"

const CustomDialogBody = ({ children }) => {
    return <DialogContent className={styles.dialog__body}>{children}</DialogContent>
}

export default CustomDialogBody
