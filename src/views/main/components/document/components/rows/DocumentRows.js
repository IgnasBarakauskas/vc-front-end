import { Table, TableBody, TableCell, TableRow } from "@mui/material"
import React from "react"
import { CustomButton, CustomIconButton, icon } from "../../../../../../common/components"
import styles from "./DocumentRows.module.css"

const DocumentRows = ({
    documentRows,
    onDeleteDocumentRow,
    onSelectDocumentRow,
    selectedDocumentRows,
    onUnselectDocRow,
    onCreateDocumentTriplet,
}) => {
    const isSelected = (documentRow) => selectedDocumentRows.indexOf(documentRow)

    return (
        <>
            <CustomButton
                disabled={selectedDocumentRows.length < 3}
                className={styles.generationButton}
                color="secondary"
                onClick={onCreateDocumentTriplet}
                icon={icon.faPlus}
            >
                Generate triplet
            </CustomButton>
            <div className={styles.tableContainer}>
                <Table>
                    <TableBody size="small">
                        {documentRows.map((documentRow, index) => {
                            const selectionId = isSelected(documentRow) + 1
                            return (
                                <TableRow key={documentRow._id}>
                                    <TableCell
                                        className={`${styles.tableCell} ${styles["tableCell--icon"]} ${
                                            index + 1 === documentRows.length && styles["tableCell--last"]
                                        }`}
                                        padding="none"
                                    >
                                        {(selectionId === 0 && (
                                            <CustomIconButton
                                                icon={icon.faSquare}
                                                onClick={() => onSelectDocumentRow(documentRow)}
                                            />
                                        )) || (
                                            <CustomButton
                                                onClick={() => onUnselectDocRow(documentRow)}
                                                color="light-secondary"
                                                className={styles.idButton}
                                            >
                                                {selectionId}
                                            </CustomButton>
                                        )}
                                    </TableCell>
                                    <TableCell
                                        className={`${styles.tableCell} ${
                                            index + 1 === documentRows.length && styles["tableCell--last"]
                                        }`}
                                        padding="none"
                                    >
                                        <span className={styles.prefix}>{documentRow.rNode[0].rprefix_id.name}</span>
                                        <span className={styles.name}>{documentRow.rNode[0].name}</span>
                                        <span className={styles.prefix}>{documentRow.rLabel[0].rprefix_id.name}</span>
                                        <span className={styles.name}>{documentRow.rLabel[0].name}</span>
                                        <span className={styles.name}>{documentRow.item[0].name}</span>
                                    </TableCell>
                                    <TableCell
                                        className={`${styles.tableCell} ${styles["tableCell--icon"]} ${
                                            index + 1 === documentRows.length && styles["tableCell--last"]
                                        }`}
                                        padding="none"
                                    >
                                        <CustomIconButton
                                            color="danger"
                                            icon={icon.faMinus}
                                            onClick={() => onDeleteDocumentRow(documentRow._id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default DocumentRows
