import React from "react"
import { CustomButton, CustomTextField } from "../../../../common/components"
import styles from "../SignInOut.module.css"

const SignUp = ({ open }) => {
    return (
        <div className={`${styles.container} ${styles["container--right"]}`} data-fullWidth={open}>
            <div className={styles.primaryText}>Create a new account</div>
            <div className={styles.secondaryText}>And start your journey with us</div>
            <div className={styles.subContainer}>
                <CustomTextField placeholder="Email" className={styles.textField} />
                <div className={styles.errorText}>*error</div>
                <CustomTextField placeholder="Full name" className={styles.textField} />
                <div className={styles.errorText}>*error</div>
                <CustomTextField placeholder="Password" className={styles.textField} />
                <div className={styles.errorText}>*error</div>
                <CustomTextField placeholder="Password" className={styles.textField} />
                <div className={styles.errorText}>*error</div>
            </div>
            <div className={styles.subContainer}>
                <CustomButton className={styles.button} size="xl" color="secondary">
                    Sign Up
                </CustomButton>
            </div>
        </div>
    )
}

export default SignUp
