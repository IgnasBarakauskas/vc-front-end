import React, { useState } from "react"
import { CustomTextField, CustomButton, icon } from "../../../../common/components"
import styles from "../SignInOut.module.css"

const SignIn = ({ open }) => {
    const [showPassword, setShowPassWord] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const handleChangeShowPassword = () => {
        setShowPassWord(!showPassword)
    }
    const handlePassword = (value) => {
        setPassword(value)
    }
    const handleEmail = (value) => {
        setEmail(value)
    }
    return (
        <div className={`${styles.container} ${styles["container--left"]}`} data-fullWidth={open}>
            <div className={styles.primaryText}>Login to your account</div>
            <div className={styles.secondaryText}>And continue from where you left off </div>
            <div className={styles.subContainer}>
                <CustomTextField
                    value={email}
                    onChange={handleEmail}
                    placeholder="Email"
                    className={styles.textField}
                />
                <div className={styles.errorText}>*error</div>
                <CustomTextField
                    placeholder="Password"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onClick={handleChangeShowPassword}
                    onChange={handlePassword}
                    className={styles.textField}
                    icon={showPassword ? icon.faEye : icon.faEyeSlash}
                />
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
