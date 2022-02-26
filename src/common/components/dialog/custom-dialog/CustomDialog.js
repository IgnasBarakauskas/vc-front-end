import { Dialog } from "@mui/material"
import React from "react"

const CustomDialog = ({ children, open, onClose }) => {
    return (
        <Dialog maxWidth="false" open={open} onClose={onClose}>
            {children}
        </Dialog>
    )
}

export default CustomDialog
