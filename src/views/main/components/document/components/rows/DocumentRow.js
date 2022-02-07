import React, { useState, useEffect, useRef } from "react"
import { CustomButton, CustomIconButton, CustomTextField, EmptyState, icon } from "../../../../../../common/components"
import LocalDropDown from "./LocalDropDown"
import styles from "./Rows.module.css"

const DocumentRow = ({ documentPrefixes = [], nodes = [], labels = [], items = [], onCreateDocumentRow = null }) => {
    const [documentNodePrefix, setDocumentNodePrefix] = useState(null)
    const [documentLabelPrefix, setDocumentLabelPrefix] = useState(null)
    const [filteredNodes, setFilteredNodes] = useState([])
    const [filteredLabels, setFilteredLabels] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [openPrefixes, setOpenPrefixes] = useState(false)
    const [openNodes, setOpenNodes] = useState(false)
    const [openLabels, setOpenLabels] = useState(false)
    const [openItems, setOpenItems] = useState(false)
    const [nodeValue, setNodeValue] = useState({ name: "" })
    const [labelValue, setLabelValue] = useState({ name: "" })
    const [itemValue, setItemValue] = useState({ name: "" })
    const [mode, setMode] = useState("")
    const anchorRefNode = useRef(null)
    const anchorRefLabel = useRef(null)
    const anchorRefNodes = useRef(null)
    const anchorRefLabels = useRef(null)
    const anchorRefItems = useRef(null)
    useEffect(() => {
        if (Array.isArray(documentPrefixes) && documentPrefixes.length > 0) {
            setDocumentNodePrefix(documentPrefixes[0])
            setDocumentLabelPrefix(documentPrefixes[0])
        }
    }, [documentPrefixes])
    useEffect(() => {
        const tempNodes = nodes.filter((node) => node.rprefix_id._id === documentNodePrefix._id)
        setFilteredNodes(
            tempNodes.filter((node) => node.name.toLowerCase().includes(nodeValue.name.toLowerCase())).slice(0, 10)
        )
    }, [nodes, documentNodePrefix, nodeValue.name])
    useEffect(() => {
        const tempLabels = labels.filter((label) => label.rprefix_id._id === documentLabelPrefix._id)
        setFilteredLabels(
            tempLabels.filter((label) => label.name.toLowerCase().includes(labelValue.name.toLowerCase())).slice(0, 10)
        )
    }, [labels, documentLabelPrefix, labelValue.name])
    useEffect(() => {
        setFilteredItems(
            items.filter((item) => item.name.toLowerCase().includes(itemValue.name.toLowerCase())).slice(0, 10)
        )
    }, [items, itemValue.name])
    const handleOpen = (newMode) => {
        setOpenPrefixes(true)
        setMode(newMode)
    }
    const handleClose = () => {
        setOpenPrefixes(false)
    }
    const handleSetDocumentNodePrefix = (prefix) => {
        setDocumentNodePrefix(prefix)
        handleClose()
    }
    const handleDocumentLabelPrefix = (prefix) => {
        setDocumentLabelPrefix(prefix)
        handleClose()
    }
    const handleSetNodeValue = (value) => {
        setOpenNodes(true)
        setNodeValue({ name: value })
    }
    const handleSetLabelValue = (value) => {
        setOpenLabels(true)
        setLabelValue({ name: value })
    }
    const handleSetItemValue = (value) => {
        setOpenItems(true)
        setItemValue({ name: value })
    }
    const handleCreateDocumentRow = () => {
        onCreateDocumentRow({ first_column: nodeValue._id, second_column: labelValue._id, third_column: itemValue._id })
    }
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
                        <CustomTextField
                            id="node"
                            ref={anchorRefNodes}
                            disableAutoComplete
                            onChange={handleSetNodeValue}
                            value={nodeValue.name}
                            onClickTextField={() => setOpenNodes(true)}
                            size="small"
                            placeholder="node"
                            className={styles.input__textfield}
                        />
                        <CustomButton
                            size="lg"
                            onClick={() => handleOpen("label")}
                            ref={anchorRefLabel}
                            color="light-secondary"
                            className={`${styles.input__button} ${styles["input__button--inner"]}`}
                        >
                            {documentLabelPrefix.name}
                        </CustomButton>
                        <CustomTextField
                            id="label"
                            ref={anchorRefLabels}
                            value={labelValue.name}
                            disableAutoComplete
                            onChange={handleSetLabelValue}
                            onClickTextField={() => setOpenLabels(true)}
                            size="small"
                            placeholder="label"
                            className={styles.input__textfield}
                        />
                        <CustomTextField
                            id="item"
                            ref={anchorRefItems}
                            value={itemValue.name}
                            onChange={handleSetItemValue}
                            disableAutoComplete
                            onClickTextField={() => setOpenItems(true)}
                            size="small"
                            placeholder="value"
                            className={`${styles.input__textfield} ${styles["input__textfield--last"]}`}
                        />
                        <CustomIconButton onClick={handleCreateDocumentRow} icon={icon.faPlus} />
                    </div>

                    <LocalDropDown
                        onClose={handleClose}
                        values={documentPrefixes}
                        open={openPrefixes}
                        ref={mode === "node" ? anchorRefNode : anchorRefLabel}
                        onSelect={mode === "node" ? handleSetDocumentNodePrefix : handleDocumentLabelPrefix}
                    />
                    <LocalDropDown
                        ref={anchorRefNodes}
                        open={openNodes}
                        onSelect={(node) => {
                            setNodeValue(node)
                            setOpenNodes(false)
                        }}
                        onClose={() => {
                            setOpenNodes(false)
                        }}
                        values={filteredNodes}
                    />
                    <LocalDropDown
                        ref={anchorRefLabels}
                        open={openLabels}
                        onSelect={(label) => {
                            setLabelValue(label)
                            setOpenLabels(false)
                        }}
                        onClose={() => {
                            setOpenLabels(false)
                        }}
                        values={filteredLabels}
                    />
                    <LocalDropDown
                        ref={anchorRefItems}
                        onSelect={(label) => {
                            setItemValue(label)
                            setOpenItems(false)
                        }}
                        open={openItems}
                        onClose={() => {
                            setOpenItems(false)
                        }}
                        values={filteredItems}
                    />
                </>
            )}
        </div>
    )
}

export default DocumentRow
