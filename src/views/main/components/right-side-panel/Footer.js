import React from "react"
import { CustomButton, icon } from "../../../../common/components"
import styles from "./Footer.module.css"

const Footer = ({ open }) => {
    const handleSynch = () => {
        window.location.reload()
    }
    return (
        <span>
            <div data-open={open} className={styles.container}>
                <CustomButton size="lg" onClick={handleSynch} icon={icon.faLongArrowAltDown}>
                    Synchronize
                </CustomButton>
            </div>
        </span>
    )
}

export default Footer
