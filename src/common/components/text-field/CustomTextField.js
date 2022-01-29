import { TextField } from "@mui/material"
import React from "react"
import styles from "./CustomTextField.module.css"

const CustomTextField = ({ className = "", fullWidth, placeholder }) => {
    return (
        <TextField
            placeholder={placeholder}
            className={`${styles.textField} ${fullWidth && styles["textField--fullWidth"]} ${className}`}
        />
    )
}

export default CustomTextField
