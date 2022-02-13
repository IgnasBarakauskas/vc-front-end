import React from "react"
import { CustomIconButton, icon } from "../../../../../../common/components"
import styles from "./DocumentList.module.css"
// import { getUserId } from "../../../../../../common/utils"

export default function DocumentList({ documents }) {
    //  const [delet, setDelet] = useState(true)
    //  const handleDelet = () => {
    //      if (user_id === getUserId) setDelet(delet)
    //  }
    return (
        <span>
            {Array.isArray(documents) &&
                documents.length > 0 &&
                documents.map((document) => (
                    <div key={document._id} className={styles.mainDocument} style={{ cursor: "pointer" }}>
                        <CustomIconButton icon={icon.faMinus} />
                        {document.name}
                    </div>
                ))}
        </span>
    )
}
