import React, { useRef, useState } from "react"
import { MenuItem } from "@mui/material"
import { CustomButton, DropDown } from "../../common/components"
import { SidePanel } from "./components"
import styles from "./Main.module.css"

const Main = () => {
    const [userOpen, setUserOpen] = useState(false)
    const anchorRef = useRef(null)
    const handleLogOut = () => {
        window.sessionStorage.clear()
        window.dispatchEvent(new Event("storage"))
    }
    const handleUserClose = () => {
        setUserOpen(false)
    }
    const handleUserOpen = () => {
        setUserOpen(!userOpen)
    }
    const handleInitial = () => {
        const name = window.sessionStorage.getItem("name")
        const spaceIndex = name.indexOf(" ")
        return name.substring(0, 1) + name.substring(spaceIndex + 1, spaceIndex + 2)
    }
    return (
        <div className={styles.container}>
            <SidePanel />
            <div className={styles.subContainer}>
                <CustomButton
                    ref={anchorRef}
                    size="lg"
                    className={styles.userButton}
                    color="secondary"
                    onClick={handleUserOpen}
                >
                    {handleInitial()}
                </CustomButton>
                <DropDown ref={anchorRef} open={userOpen} onClose={handleUserClose}>
                    <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
                </DropDown>
            </div>
        </div>
    )
}

export default Main
