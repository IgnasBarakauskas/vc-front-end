import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useEffect } from "react"
import { CustomButton, CustomIconButton, CustomTextField, EmptyState, icon } from "../../../../common/components"
import { getUserId } from "../../../../common/utils"
import { createComment, deleteComment, getComments } from "../../../../services/commentServices"
import Footer from "./Footer"
import styles from "./RightSidePanel.module.css"

const RightSidePanel = ({ rdocument }) => {
    const [open, setOpen] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const [commentText, setCommentText] = useState("")
    const [comments, setComments] = useState([])
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setShowContent(true)
            }, 600)
        } else {
            setShowContent(false)
        }
    }, [open])
    useEffect(() => {
        getComments(rdocument._id)
            .then((data) => setComments(data.data.comments))
            .catch((err) => console.error(err))
    }, [rdocument._id])
    const handleOpen = () => {
        setOpen(!open)
    }
    const handleSetComment = (value) => {
        setCommentText(value)
    }
    const handleCreateComment = () => {
        if (commentText.length > 4) {
            createComment({ rdocument_id: rdocument._id, text: commentText })
                .then((data) => {
                    setComments([data.data, ...comments])
                    setCommentText("")
                })
                .catch((err) => console.error(err))
        }
    }

    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000)

        let interval = seconds / 31536000

        if (interval > 1) {
            return `${Math.floor(interval)} years ago`
        }
        interval = seconds / 2592000
        if (interval > 1) {
            return `${Math.floor(interval)} months ago`
        }
        interval = seconds / 86400
        if (interval > 1) {
            return `${Math.floor(interval)} days ago`
        }
        interval = seconds / 3600
        if (interval > 1) {
            return `${Math.floor(interval)} hours ago`
        }
        interval = seconds / 60
        if (interval > 1) {
            return `${Math.floor(interval)} minutes ago`
        }
        return `${Math.floor(seconds)} seconds ago`
    }
    const handleDeleteComment = (delComment) => {
        deleteComment(delComment._id)
            .then(() => setComments(comments.filter((comment) => delComment !== comment)))
            .catch((err) => console.error(err))
    }

    return (
        <div data-opened={open} className={styles.container}>
            <CustomButton onClick={handleOpen} color="transparent" className={styles.button}>
                <FontAwesomeIcon size="2x" icon={icon.faUsers} />
            </CustomButton>
            {open && (
                <div data-open={showContent} className={styles.contentContainer}>
                    <div>
                        <div className={styles.commentsContainer}>
                            {(Array.isArray(comments) &&
                                comments.length > 0 &&
                                comments.map((comment) => (
                                    <div key={comment._id} className={styles.commentContainer}>
                                        <div className={styles.commentHelperTextContainer}>
                                            <span className={styles.commentHelperText}>{comment.user_id.name}</span>
                                            <span className={styles.commentHelperText}>
                                                {timeSince(comment.createdAt)}
                                                {comment.user_id._id === getUserId() && (
                                                    <CustomIconButton
                                                        onClick={() => handleDeleteComment(comment)}
                                                        icon={icon.faMinus}
                                                        color="var(--color-red)"
                                                        size="sm"
                                                    />
                                                )}
                                            </span>
                                        </div>
                                        {comment.text}
                                    </div>
                                ))) || <EmptyState>There are no comments</EmptyState>}
                        </div>
                        <div className={styles.commentsCreationContainer}>
                            <CustomTextField
                                className={styles.commentTextField}
                                value={commentText}
                                size="small"
                                onChange={handleSetComment}
                                placeholder="New comment"
                            />
                            <CustomIconButton
                                onClick={handleCreateComment}
                                color="var(--color-white)"
                                size="lg"
                                icon={icon.faCommentDots}
                            />
                        </div>
                    </div>
                    <Footer open={showContent} rdocument={rdocument} />
                </div>
            )}
        </div>
    )
}

export default RightSidePanel
