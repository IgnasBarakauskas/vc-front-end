import { Table, TableBody, TableCell, TableRow } from "@mui/material"
import React, { useState, useRef, useEffect } from "react"
import { CustomIconButton, CustomTextField, EmptyState, icon } from "../../../../../../common/components"
import stylesRows from "./Rows.module.css"
import styles from "./DocumentRows.module.css"
import LocalDropDown from "./LocalDropDown"

const DocumentTriplet = ({
    documentTriplets,
    loadingDocTriplets,
    onDeleteDocumentTriplet,
    onSelectRow,
    documentRows,
    selectedDocumentRows,
    onSelectDocumentRow,
    onCreateDocumentTriplet,
}) => {
    const [firstNodeText, setFirstNodeText] = useState("")
    const [secondNodeText, setSecondNodeText] = useState("")
    const [thirdNodeText, setThirdNodeText] = useState("")
    const [filteredFirstNodes, setFilteredFirstNodes] = useState([])
    const [filteredSecondNodes, setFilteredSecondNodes] = useState([])
    const [filteredThirdNodes, setFilteredThirdNodes] = useState([])
    const [openFirst, setOpenFirst] = useState(false)
    const [openSecond, setOpenSecond] = useState(false)
    const [openThird, setOpenThird] = useState(false)
    const firstAnchorRef = useRef()
    const secondAnchorRef = useRef()
    const thirdAnchorRef = useRef()

    useEffect(() => {
        setFilteredFirstNodes(
            documentRows
                .filter(
                    (row) =>
                        row.rNode[0].name.toLowerCase().includes(firstNodeText.toLowerCase()) &&
                        row.rLabel[0].name !== "altLabel"
                )
                .slice(0, 5)
        )
    }, [firstNodeText, documentRows])
    useEffect(() => {
        setFilteredSecondNodes(
            documentRows
                .filter(
                    (row) =>
                        row.rNode[0].name.toLowerCase().includes(secondNodeText.toLowerCase()) &&
                        row.rLabel[0].name !== "altLabel"
                )
                .slice(0, 5)
        )
    }, [secondNodeText, documentRows])
    useEffect(() => {
        setFilteredThirdNodes(
            documentRows
                .filter(
                    (row) =>
                        row.rNode[0].name.toLowerCase().includes(thirdNodeText.toLowerCase()) &&
                        row.rLabel[0].name !== "altLabel"
                )
                .slice(0, 5)
        )
    }, [thirdNodeText, documentRows])
    useEffect(() => {
        setFirstNodeText(selectedDocumentRows[0]?.rNode[0]?.name || "")
        setSecondNodeText(selectedDocumentRows[1]?.rNode[0]?.name || "")
        setThirdNodeText(selectedDocumentRows[2]?.rNode[0]?.name || "")
    }, [selectedDocumentRows])

    return (
        <div className={stylesRows.subContainer}>
            {((!Array.isArray(documentTriplets) || documentTriplets.length === 0 || loadingDocTriplets) && (
                <EmptyState isLoading={loadingDocTriplets}>There are no document triplets</EmptyState>
            )) || (
                <>
                    <div>
                        <div className={styles.title}>Document triplets</div>
                    </div>
                    <div className={styles.tableContainer__triplets}>
                        <Table>
                            <TableBody size="small">
                                {documentTriplets.map((documentTriplet, index) => (
                                    <TableRow key={documentTriplet._id}>
                                        <TableCell
                                            className={`${styles.tableCell} ${
                                                index + 1 === documentTriplets.length && styles["tableCell--last"]
                                            }`}
                                            padding="none"
                                        >
                                            <span className={styles.name}>
                                                {documentTriplet.row_data.first_column.item[0].name}
                                            </span>
                                        </TableCell>
                                        <TableCell
                                            className={`${styles.tableCell} ${
                                                index + 1 === documentTriplets.length && styles["tableCell--last"]
                                            }`}
                                            padding="none"
                                        >
                                            <span className={styles.name}>
                                                {documentTriplet.row_data.second_column.item[0].name}
                                            </span>
                                        </TableCell>
                                        <TableCell
                                            className={`${styles.tableCell} ${
                                                index + 1 === documentTriplets.length && styles["tableCell--last"]
                                            }`}
                                            padding="none"
                                        >
                                            <span className={styles.name}>
                                                {documentTriplet.row_data.third_column.item[0].name}
                                            </span>
                                        </TableCell>
                                        <TableCell
                                            className={`${styles.tableCell} ${styles["tableCell--icon"]} ${
                                                index + 1 === documentTriplets.length && styles["tableCell--last"]
                                            }`}
                                            padding="none"
                                        >
                                            <CustomIconButton
                                                icon={icon.faCommentDots}
                                                color="var(--color-secondary)"
                                                onClick={() => onSelectRow(documentTriplet._id)}
                                            />
                                            <CustomIconButton
                                                color="var(--color-red)"
                                                icon={icon.faMinus}
                                                onClick={() => onDeleteDocumentTriplet(documentTriplet._id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
            {(Array.isArray(documentRows), documentRows.length > 2) && (
                <div className={styles.input}>
                    <CustomTextField
                        id="node"
                        ref={firstAnchorRef}
                        disableAutoComplete
                        onChange={setFirstNodeText}
                        value={firstNodeText}
                        onClickTextField={() => setOpenFirst(true)}
                        size="small"
                        placeholder="first node"
                        className={styles.input__textfield}
                    />
                    <CustomTextField
                        id="label"
                        ref={secondAnchorRef}
                        value={secondNodeText}
                        disableAutoComplete
                        onChange={setSecondNodeText}
                        onClickTextField={() => setOpenSecond(true)}
                        size="small"
                        placeholder="second node"
                        className={styles.input__textfield}
                    />
                    <CustomTextField
                        id="item"
                        ref={thirdAnchorRef}
                        value={thirdNodeText}
                        onChange={setThirdNodeText}
                        disableAutoComplete
                        onClickTextField={() => setOpenThird(true)}
                        size="small"
                        placeholder="third node"
                        className={`${styles.input__textfield} ${styles["input__textfield--last"]}`}
                    />
                    <CustomIconButton
                        size="lg"
                        color="var(--color-secondary)"
                        onClick={onCreateDocumentTriplet}
                        disabled={
                            !(
                                selectedDocumentRows[0]?.rNode[0]?.name &&
                                selectedDocumentRows[1]?.rNode[0]?.name &&
                                selectedDocumentRows[2]?.rNode[0]?.name
                            )
                        }
                        icon={icon.faPlus}
                    />
                    <LocalDropDown
                        ref={firstAnchorRef}
                        open={openFirst}
                        onSelect={(node) => {
                            onSelectDocumentRow(node, 0)
                            setOpenFirst(false)
                        }}
                        onClose={() => {
                            setOpenFirst(false)
                        }}
                        values={filteredFirstNodes}
                    />
                    <LocalDropDown
                        ref={secondAnchorRef}
                        open={openSecond}
                        onSelect={(node) => {
                            onSelectDocumentRow(node, 1)
                            setOpenSecond(false)
                        }}
                        onClose={() => {
                            setOpenSecond(false)
                        }}
                        values={filteredSecondNodes}
                    />
                    <LocalDropDown
                        ref={thirdAnchorRef}
                        onSelect={(node) => {
                            onSelectDocumentRow(node, 2)
                            setOpenThird(false)
                        }}
                        open={openThird}
                        onClose={() => {
                            setOpenThird(false)
                        }}
                        values={filteredThirdNodes}
                    />
                </div>
            )}
        </div>
    )
}

export default DocumentTriplet
