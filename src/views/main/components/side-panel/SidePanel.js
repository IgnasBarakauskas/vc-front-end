import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CustomButton, icon } from "../../../../common/components"
import styles from "./SidePanel.module.css"

const SidePanel = () => {
    return (
        <div className={styles.container}>
            <CustomButton color="transparent" className={styles.button}>
                <FontAwesomeIcon size="2x" icon={icon.faBars} />
            </CustomButton>
        </div>
    )
}

export default SidePanel
