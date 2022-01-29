import React from "react"
import { CustomTextField, CustomButton } from "../../../../common/components"
import styles from "../SignInOut.module.css"

const SignIn = ({ open }) => {
    return (
        <div className={`${styles.container} ${styles["container--left"]}`} data-fullWidth={open}>
            <div className={styles.primaryText}>Login to your account</div>
            <div className={styles.secondaryText}>And continue from where you left off </div>
            <div className={styles.subContainer}>
                <CustomTextField placeholder="Email" className={styles.textField} />
                <div className={styles.errorText}>*error</div>
                <CustomTextField placeholder="Password" className={styles.textField} />
                <div className={styles.errorText}>*error</div>
            </div>
            <div className={styles.subContainer}>
                <CustomButton className={styles.button} size="xl" color="secondary">
                    Sign In
                </CustomButton>
            </div>
        </div>
    )
}

export default SignIn
