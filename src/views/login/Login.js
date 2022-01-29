import React, { useState } from "react"
import CustomButton from "../../common/components/button/CustomButton"
import { SignIn, SignUp } from "./components"
import styles from "./Login.module.css"

const Login = () => {
    const [isLoging, setIsLoging] = useState(true)
    const changeMode = () => {
        setIsLoging(!isLoging)
    }
    return (
        <div className={styles.container}>
            <div className={styles.selector} data-login={isLoging}>
                <div className={styles.mainText}>
                    {isLoging ? "Are you still not registered?" : "Are you already the part of our team?"}
                </div>
                <div className={styles.secondaryText}>
                    {isLoging
                        ? "Then press button down below and start your jurney with us!"
                        : "Then what are you waiting for? Sign in and continue from where you left off"}
                </div>
                <div className={styles.buttonContainer}>
                    <CustomButton size="xl" className={styles.button} variant="contained" onClick={changeMode}>
                        {isLoging ? "Sign up" : "Sign in"}
                    </CustomButton>
                </div>
            </div>
            <SignIn open={isLoging} />
            <SignUp open={!isLoging} />
        </div>
    )
}

export default Login
