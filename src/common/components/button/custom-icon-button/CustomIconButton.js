import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@mui/material"
import styles from "./CustomIconButton.module.css"

const CustomIconButton = ({ icon, onClick, disabled, color = "primary", size = "md" }) => {
    return (
        <Button className={styles.button} data-size={size} disabled={disabled} onClick={onClick}>
            <FontAwesomeIcon color={color} data-size={size} className={styles.icon} icon={icon} />
        </Button>
    )
}

export default CustomIconButton
