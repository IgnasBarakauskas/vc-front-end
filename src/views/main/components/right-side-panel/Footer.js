import React, { useEffect, useState } from "react"
import { CustomButton, CustomDialog, CustomDialogBody, CustomDialogTitle, icon } from "../../../../common/components"
import { inviteUser } from "../../../../services/documentServices"
import { getAllUsers } from "../../../../services/userServices"
import styles from "./Footer.module.css"

const Footer = ({ open, rdocument }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [docUsers, setDocUsers] = useState([])
    const [otherUsers, setOtherUsers] = useState([])
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleSynch = () => {
        window.location.reload()
    }
    useEffect(() => {
        if (Array.isArray(rdocument.users) && rdocument.users.length > 0)
            getAllUsers()
                .then((data) => {
                    setDocUsers(data.data.users.filter((user) => rdocument.users.includes(user._id)))
                    setOtherUsers(data.data.users.filter((user) => !rdocument.users.includes(user._id)))
                })
                .catch((err) => console.error(err))
    }, [rdocument.users])
    const handleInviteUser = (user) => {
        inviteUser({
            document_id: rdocument._id,
            invited_user_id: user._id,
            invited_user_email: user.email,
        })
    }
    return (
        <span>
            <div data-open={open} className={styles.container}>
                <div className={styles.buttonContainer}>
                    <CustomButton onClick={handleOpenDialog} className={styles.button} icon={icon.faUsers} size="lg">
                        Project Users
                    </CustomButton>
                </div>
                <div className={styles.buttonContainer}>
                    <CustomButton
                        className={styles.button}
                        size="lg"
                        onClick={handleSynch}
                        icon={icon.faLongArrowAltDown}
                    >
                        Synchronize
                    </CustomButton>
                </div>
            </div>
            <CustomDialog open={openDialog} onClose={handleCloseDialog}>
                <CustomDialogTitle onClose={handleCloseDialog}>Document users</CustomDialogTitle>
                <CustomDialogBody>
                    <div className={styles.dialogContainer}>
                        <div className={styles.dialogHalfContainer}>
                            {Array.isArray(docUsers) &&
                                docUsers.length > 0 &&
                                docUsers.map((user) => (
                                    <CustomButton
                                        size="fit-content"
                                        className={styles.userButton}
                                        key={user._id}
                                        variant="outlined"
                                    >
                                        <div className={styles.userEmail}>{user.email}</div>
                                        <div className={styles.userName}>{user.name}</div>
                                    </CustomButton>
                                ))}
                        </div>
                        <div className={styles.dialogHalfContainer}>
                            {Array.isArray(otherUsers) &&
                                otherUsers.length > 0 &&
                                otherUsers.map((user) => (
                                    <CustomButton
                                        size="fit-content"
                                        className={styles.userButton}
                                        key={user._id}
                                        variant="outlined"
                                        onClick={() => handleInviteUser(user)}
                                    >
                                        <div className={styles.userEmail}>{user.email}</div>
                                        <div className={styles.userName}>{user.name}</div>
                                    </CustomButton>
                                ))}
                        </div>
                    </div>
                </CustomDialogBody>
            </CustomDialog>
        </span>
    )
}

export default Footer
