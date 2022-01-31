import React from "react"
import { Button } from "@mui/material"
import styles from "./CustomButton.module.css"

const CustomButton = React.forwardRef(
    ({ children, className = "", color = "primary", disabled, onClick, variant, size = "md" }, ref) => {
        return (
            <Button
                ref={ref}
                className={`${styles.button} ${className}`}
                onClick={onClick}
                disabled={disabled}
                variant={variant}
                data-color={color}
                data-size={size}
            >
                {children}
            </Button>
        )
    }
)
export default CustomButton
