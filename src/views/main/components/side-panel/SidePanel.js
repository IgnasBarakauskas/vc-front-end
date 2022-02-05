import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CustomButton, icon } from "../../../../common/components"
import styles from "./SidePanel.module.css"
import Footer from "./components/footer/Footer"

const SidePanel = ({ onAddNewDocument }) => {
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
                <FontAwesomeIcon size="2x" icon={icon.faBars} />
            </CustomButton>
            {open && (
                <div data-open={showContent} className={styles.contentContainer}>
                    <Footer onAddNewDocument={onAddNewDocument} open={showContent} />
                </div>
            )}
        </div>
    )
}

export default SidePanel
