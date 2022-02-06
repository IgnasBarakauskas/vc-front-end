import React from "react"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./CustomTextField.module.css"

const CustomTextField = ({
    className = "",
    value = "",
    fullWidth,
    placeholder,
    type,
    icon,
    onClick,
    onChange,
    size = "medium",
}) => {
    return (
        <TextField
            value={value}
            size={size}
            type={type}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            InputProps={{
                endAdornment: icon && (
                    <InputAdornment position="start">
                        <IconButton onClick={onClick} className={styles.textField__button}>
                            <FontAwesomeIcon color="var(--color-secondary)" icon={icon} />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            className={`${styles.textField} ${fullWidth && styles["textField--fullWidth"]} ${className}`}
        />
    )
}

export default CustomTextField
