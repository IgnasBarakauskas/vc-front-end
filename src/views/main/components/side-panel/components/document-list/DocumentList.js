import React from "react"
import { CustomButton, CustomIconButton, icon } from "../../../../../../common/components"
import { getUserId } from "../../../../../../common/utils"
import styles from "./DocumentList.module.css"

export default function DocumentList({ documents, onDeleteDocument }) {
    return (
        <span>
            {Array.isArray(documents) &&
                documents.length > 0 &&
                documents.map((document) => (
                    <div key={document._id} className={styles.mainDocument}>
                        <CustomButton className={styles.documentButton} color="transparent">
                            {document.name}
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
        </span>
    )
}
