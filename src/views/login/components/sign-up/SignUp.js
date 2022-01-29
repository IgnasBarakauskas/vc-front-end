import React, { useState } from "react"
import { CustomButton, CustomTextField, icon } from "../../../../common/components"
import regex from "../../../../common/utils"
import styles from "../SignInOut.module.css"

const SignUp = ({ open }) => {
    const [showPassword, setShowPassWord] = useState(false)
    const [email, setEmail] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [name, setName] = useState("")
    const [nameErr, setNameErr] = useState("")
    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [rePasswordErr, setRePasswordErr] = useState("")
    const handleChangeShowPassword = () => {
        setShowPassWord(!showPassword)
    }
    const handleEmail = (value) => {
        setEmail(value)
        if (!regex.emailRegex.test(value)) {
            setEmailErr("*Your email is not valid")
        } else {
            setEmailErr("")
        }
    }
    const handleName = (value) => {
        setName(value)
        if (value.length < 4) {
            setNameErr("*Your full name is too short")
        } else {
            setNameErr("")
        }
    }
    const handlePassword = (value) => {
        setPassword(value)
        if (rePassword === value) {
            setRePasswordErr("")
        }
        if (value.length < 4) {
            setPasswordErr("*Your password is too short")
        } else {
            setPasswordErr("")
        }
    }
    const handleRePassword = (value) => {
        setRePassword(value)
        if (password !== value) {
            setRePasswordErr("*Your passwords are not matching")
        } else {
            setRePasswordErr("")
        }
    }
    return (
        <div className={`${styles.container} ${styles["container--right"]}`} data-fullwidth={open}>
            <div className={styles.primaryText}>Create a new account</div>
            <div className={styles.secondaryText}>And start your journey with us</div>
            <div className={styles.subContainer}>
                <CustomTextField
                    onChange={handleEmail}
                    value={email}
                    placeholder="Email"
                    className={styles.textField}
                />
                <div className={styles.errorText}>{emailErr || " "}</div>
                <CustomTextField
                    onChange={handleName}
                    value={name}
                    placeholder="Full name"
                    className={styles.textField}
                />
                <div className={styles.errorText}>{nameErr || " "}</div>
                <CustomTextField
                    value={password}
                    onChange={handlePassword}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onClick={handleChangeShowPassword}
                    className={styles.textField}
                    icon={showPassword ? icon.faEye : icon.faEyeSlash}
                />
                <div className={styles.errorText}>{passwordErr || " "}</div>
                <CustomTextField
                    value={rePassword}
                    onChange={handleRePassword}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onClick={handleChangeShowPassword}
                    className={styles.textField}
                    icon={showPassword ? icon.faEye : icon.faEyeSlash}
                />
                <div className={styles.errorText}>{rePasswordErr || " "}</div>
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
