import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useEffect } from "react"
import { CustomButton, icon } from "../../../../common/components"
import Footer from "./Footer"
import styles from "./RightSidePanel.module.css"

const RightSidePanel = () => {
    const [open, setOpen] = useState(false)
    const [showContent, setShowContent] = useState(false)
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setShowContent(true)
            }, 600)
        } else {
            setShowContent(false)
        }
    }, [open])
    const handleOpen = () => {
        setOpen(!open)
    }
    return (
        <div data-opened={open} className={styles.container}>
            <CustomButton onClick={handleOpen} color="transparent" className={styles.button}>
                <FontAwesomeIcon size="2x" icon={icon.faUsers} />
            </CustomButton>
            {open && (
                <div data-open={showContent} className={styles.contentContainer}>
                    <Footer open={showContent} />
                </div>
            )}
        </div>
    )
}

export default RightSidePanel
