import React from "react"
import { DialogTitle } from "@mui/material"
import { CustomIconButton, icon } from "../.."
import styles from "./CustomDialogTitle.module.css"

const CustomDialogTitle = ({ children, onClose }) => {
    return (
        <DialogTitle className={styles.dialog__title}>
            <div className={styles.dialogTitle__content}>
                {children}
                {onClose && <CustomIconButton onClick={onClose} color="var(--color-secondary)" icon={icon.faTimes} />}
            </div>
        </DialogTitle>
    )
}

export default CustomDialogTitle
