import { Tooltip } from "@mui/material"
import React from "react"
import { CustomButton, CustomIconButton, icon } from "../../../../../../common/components"
import { getUserId } from "../../../../../../common/utils"
import styles from "./DocumentList.module.css"

export default function DocumentList({ documents, onDeleteDocument, selectedDocumentIndex, onSelectDocument }) {
    return (
        <div className={styles.documentList}>
            {Array.isArray(documents) &&
                documents.length > 0 &&
                documents.map((document, index) => (
                    <div key={document._id} className={styles.documentRow}>
                        <CustomButton
                            onClick={() => onSelectDocument(index)}
                            style={{ textAlign: "left" }}
                            className={styles.documentButton}
                            disabled={index === selectedDocumentIndex}
                            color="transparent"
                        >
                            <Tooltip title={document.name}>
                                <span className={styles.documentButton__name}>{document.name}</span>
                            </Tooltip>
                        </CustomButton>
                        {document.user_id === getUserId() && (
                            <CustomIconButton
                                onClick={() => onDeleteDocument(document._id)}
                                color="danger"
                                icon={icon.faMinus}
                            />
                        )}
                    </div>
                ))}
        </div>
    )
}
