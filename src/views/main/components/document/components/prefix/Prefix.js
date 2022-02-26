import React, { useState, useRef } from "react"
import { Divider, MenuItem } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CustomButton, DropDown, icon } from "../../../../../../common/components"
import styles from "./Prefix.module.css"

const Prefix = ({
    prefixes = [],
    onAddPrefix = null,
    documentPrefixes = [],
    onRemovePrefix = null,
    onGenerate,
    disabledGenerate = true,
}) => {
    const anchorRef = useRef(null)
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className={styles.container}>
            {Array.isArray(documentPrefixes) && documentPrefixes.length > 0 && (
                <span className={styles.documentPrefixes}>
                    {documentPrefixes.map((prefix, index) => (
                        <span key={prefix._id} className={styles.prefixContainer}>
                            {index !== 0 && <Divider orientation="vertical" />}
                            <div className={styles.prefix}>
                                {prefix.name}
                                <FontAwesomeIcon
                                    className={styles.iconButton}
                                    onClick={() => onRemovePrefix(prefix)}
                                    color="var(--color-dark-red)"
                                    icon={icon.faMinus}
                                />
                            </div>
                        </span>
                    ))}
                </span>
            )}
            <CustomButton
                className={styles.button}
                disabled={!Array.isArray(prefixes) || prefixes.length === 0}
                onClick={handleOpen}
                ref={anchorRef}
                size="md"
                color="secondary"
                icon={icon.faPlus}
            >
                Add Prefix
            </CustomButton>
            <DropDown ref={anchorRef} open={open} onClose={handleClose}>
                <span>
                    {Array.isArray(prefixes) &&
                        prefixes.length > 0 &&
                        prefixes.map((prefix) => (
                            <MenuItem className={styles.menuItem} onClick={() => onAddPrefix(prefix)} key={prefix._id}>
                                {prefix.name}
                            </MenuItem>
                        ))}
                </span>
            </DropDown>
            <div className={styles.generateButton}>
                <CustomButton disabled={disabledGenerate} onClick={onGenerate} color="secondary" icon={icon.faDownload}>
                    Generate File
                </CustomButton>
            </div>
        </div>
    )
}

export default Prefix
