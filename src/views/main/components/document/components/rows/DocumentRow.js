import { MenuItem } from "@mui/material"
import React, { useState, useEffect, useRef } from "react"
import { CustomButton, CustomTextField, DropDown, EmptyState } from "../../../../../../common/components"
import styles from "./Rows.module.css"

const DocumentRow = ({ documentPrefixes = [] }) => {
    const [documentNodePrefix, setDocumentNodePrefix] = useState(null)
    const [documentLabelPrefix, setDocumentLabelPrefix] = useState(null)
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState("")
    const anchorRefNode = useRef(null)
    const anchorRefLabel = useRef(null)
    const handleOpen = (newMode) => {
        setOpen(true)
        setMode(newMode)
    }
    const handleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        if (Array.isArray(documentPrefixes) && documentPrefixes.length > 0) {
            setDocumentNodePrefix(documentPrefixes[0])
            setDocumentLabelPrefix(documentPrefixes[0])
        }
    }, [documentPrefixes])
    return (
        <div className={styles.subContainer}>
            <EmptyState>There are no document rows</EmptyState>
            {documentNodePrefix && documentLabelPrefix && (
                <>
                    <div className={styles.input}>
                        <CustomButton
                            size="lg"
                            onClick={() => handleOpen("node")}
                            ref={anchorRefNode}
                            color="light-secondary"
                            className={styles.input__button}
                        >
                            {documentNodePrefix.name}
                        </CustomButton>
                        <CustomTextField size="small" placeholder="node" className={styles.input__textfield} />
                        <CustomButton
                            size="lg"
                            onClick={() => handleOpen("label")}
                            ref={anchorRefLabel}
                            color="light-secondary"
                            className={`${styles.input__button} ${styles["input__button--inner"]}`}
                        >
                            {documentLabelPrefix.name}
                        </CustomButton>
                        <CustomTextField size="small" placeholder="label" className={styles.input__textfield} />
                        <CustomTextField
                            size="small"
                            placeholder="value"
                            className={`${styles.input__textfield} ${styles["input__textfield--last"]}`}
                        />
                    </div>
                    <DropDown onClose={handleClose} open={open} ref={mode === "node" ? anchorRefNode : anchorRefLabel}>
                        <span>
                            {Array.isArray(documentPrefixes) &&
                                documentPrefixes.length > 0 &&
                                documentPrefixes.map((prefix) => (
                                    <MenuItem
                                        className={styles.menuItem}
                                        onClick={() =>
                                            mode === "node"
                                                ? setDocumentNodePrefix(prefix)
                                                : setDocumentLabelPrefix(prefix)
                                        }
                                        key={prefix._id}
                                    >
                                        {prefix.name}
                                    </MenuItem>
                                ))}
                        </span>
                    </DropDown>
                </>
            )}
        </div>
    )
}

export default DocumentRow
