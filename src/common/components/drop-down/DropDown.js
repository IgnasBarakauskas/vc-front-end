import { ClickAwayListener, Grow, Paper, Popper } from "@mui/material"
import React from "react"
import styles from "./DropDown.module.css"

const DropDown = React.forwardRef(
    ({ children, disablePortal = false, onClose = null, open = false, position = "bottom-start" }, ref) => (
        <Popper
            transition
            anchorEl={ref?.current}
            className={styles.dropDown__menus}
            disablePortal={disablePortal}
            open={open}
            placement={position}
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    className={
                        placement === position ? styles["dropDown__menus--shown"] : styles["dropDown__menus--hidden"]
                    }
                >
                    <Paper elevation={5} square={false} variant="elevation">
                        <ClickAwayListener
                            onClickAway={(e) => {
                                onClose(e)
                            }}
                        >
                            {children}
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    )
)
export default DropDown
