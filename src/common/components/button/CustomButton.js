import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@mui/material"
import styles from "./CustomButton.module.css"

const CustomButton = React.forwardRef(
    ({ children, className = "", color = "primary", disabled, onClick, variant, size = "md", icon = null }, ref) => {
        const getIconColor = () => {
            if (disabled) {
                return "var(--color-disabled-text)"
            }
            if (color === "secondary") {
                return "var(--color-white)"
            }
            return "var(--color-secondary)"
        }
        const btnIcon = icon && (
            <FontAwesomeIcon className={styles.icon} data-size={size} color={getIconColor()} icon={icon} />
        )
        return (
            <Button
                ref={ref}
                className={`${styles.button} ${className}`}
                onClick={onClick}
                disabled={disabled}
                variant={variant}
                endIcon={btnIcon}
                data-color={color}
                data-size={size}
            >
                {children}
            </Button>
        )
    }
)
export default CustomButton
