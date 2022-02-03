import React from "react"

export default function DocumentList({ documents }) {
    return (
        <span>
            {Array.isArray(documents) &&
                documents.length > 0 &&
                documents.map((document, index) => (
                    <div key={document._id}>
                        {document.name} {index}
                    </div>
                ))}
        </span>
    )
}
