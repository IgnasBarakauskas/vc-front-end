import { Table, TableBody, TableCell, TableRow } from "@mui/material"
import React from "react"
import { CustomIconButton, EmptyState, icon } from "../../../../../../common/components"
import stylesRows from "./Rows.module.css"
import styles from "./DocumentRows.module.css"

const DocumentTriplet = ({ documentTriplets, loadingDocTriplets, onDeleteDocumentTriplet }) => {
    return (
        <div className={stylesRows.subContainer}>
            {((!Array.isArray(documentTriplets) || documentTriplets.length === 0 || loadingDocTriplets) && (
                <EmptyState isLoading={loadingDocTriplets}>There are no document triplets</EmptyState>
            )) || (
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
                                            color="danger"
                                            icon={icon.faMinus}
                                            onClick={() => onDeleteDocumentTriplet(documentTriplet._id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default DocumentTriplet
