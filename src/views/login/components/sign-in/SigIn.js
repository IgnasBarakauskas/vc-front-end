import React, { useState } from "react"
import { CustomTextField, CustomButton, icon } from "../../../../common/components"
import regex from "../../../../common/utils"
import styles from "../SignInOut.module.css"

const SignIn = ({ open }) => {
    const [showPassword, setShowPassWord] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [email, setEmail] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const handleChangeShowPassword = () => {
        setShowPassWord(!showPassword)
    }
    const handlePassword = (value) => {
        setPassword(value)
        if (value.length < 4) {
            setPasswordErr("*Your password is too short")
        } else {
            setPasswordErr("")
        }
    }
    const handleEmail = (value) => {
        setEmail(value)
        if (!regex.emailRegex.test(value)) {
            setEmailErr("*Your email is not valid")
        } else {
            setEmailErr("")
        }
    }
    return (
        <div className={`${styles.container} ${styles["container--left"]}`} data-fullwidth={open}>
            <div className={styles.primaryText}>Login to your account</div>
            <div className={styles.secondaryText}>And continue from where you left off </div>
            <div className={styles.subContainer}>
                <CustomTextField
                    value={email}
                    onChange={handleEmail}
                    placeholder="Email"
                    className={styles.textField}
                />
                <div className={styles.errorText}>{emailErr || " "}</div>
                <CustomTextField
                    placeholder="Password"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onClick={handleChangeShowPassword}
                    onChange={handlePassword}
                    className={styles.textField}
                    icon={showPassword ? icon.faEye : icon.faEyeSlash}
                />
                <div className={styles.errorText}>{passwordErr || " "}</div>
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
