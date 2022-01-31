import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CustomButton, icon } from "../../../../common/components"
import styles from "./SidePanel.module.css"

const SidePanel = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }
    return (
        <div data-opened={open} className={styles.container}>
            <CustomButton onClick={handleOpen} color="transparent" className={styles.button}>
                <FontAwesomeIcon size="2x" icon={icon.faBars} />
            </CustomButton>
        </div>
    )
}

export default SidePanel
