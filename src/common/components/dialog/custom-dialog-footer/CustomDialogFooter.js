import { DialogActions } from "@mui/material"
import React from "react"
import { CustomButton } from "../.."
import styles from "./CustomDialogFooter.module.css"

const CustomDialogFooter = ({ onClose, onSubmit }) => {
    return (
        <DialogActions className={styles.dialog__footer}>
            <CustomButton onClick={onSubmit} color="secondary" className={styles.dialog__button}>
                Add
            </CustomButton>
            <CustomButton onClick={onClose} className={styles.dialog__button}>
                Cancel
            </CustomButton>
        </DialogActions>
    )
}

export default CustomDialogFooter
