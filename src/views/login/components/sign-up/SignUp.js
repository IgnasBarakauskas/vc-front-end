import React, { useState } from "react"
import { CustomButton, CustomTextField, icon } from "../../../../common/components"
import styles from "../SignInOut.module.css"

const SignUp = ({ open }) => {
    const [showPassword, setShowPassWord] = useState(false)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const handleChangeShowPassword = () => {
        setShowPassWord(!showPassword)
    }
    const handleEmail = (value) => {
        setEmail(value)
    }
    const handleName = (value) => {
        setName(value)
    }
    const handlePassword = (value) => {
        setPassword(value)
    }
    const handleRePassword = (value) => {
        setRePassword(value)
    }
    return (
        <div className={`${styles.container} ${styles["container--right"]}`} data-fullWidth={open}>
            <div className={styles.primaryText}>Create a new account</div>
            <div className={styles.secondaryText}>And start your journey with us</div>
            <div className={styles.subContainer}>
                <CustomTextField
                    onChange={handleEmail}
                    value={email}
                    placeholder="Email"
                    className={styles.textField}
                />
                <div className={styles.errorText}>*error</div>
                <CustomTextField
                    onChange={handleName}
                    value={name}
                    placeholder="Full name"
                    className={styles.textField}
                />
                <div className={styles.errorText}>*error</div>
                <CustomTextField
                    value={password}
                    onChange={handlePassword}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onClick={handleChangeShowPassword}
                    className={styles.textField}
                    icon={showPassword ? icon.faEye : icon.faEyeSlash}
                />
                <div className={styles.errorText}>*error</div>
                <CustomTextField
                    value={rePassword}
                    onChange={handleRePassword}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onClick={handleChangeShowPassword}
                    className={styles.textField}
                    icon={showPassword ? icon.faEye : icon.faEyeSlash}
                />
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
