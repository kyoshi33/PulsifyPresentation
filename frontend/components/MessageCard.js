import styles from '../styles/MessageCard.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';
import SignalementModal from './SignalementModal';
import UserCard from './UserCard'


function MessageCard(props) {
    const user = useSelector((state) => state.user.value)
    const [modalIsOpen, setIsOpen] = useState(false);

    const openSignalementModal = () => {
        setIsOpen(true)
    }

    const closeSignalementModal = () => {
        setIsOpen(false)
    }

    const isCommentPoster = user.email === props.userId.email;
    console.log('user :', user)
    console.log('props.user :', props.userId)

    const removeComment = () => {

    }

    return (
        <div className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
                <UserCard
                    firstname={props.userId.firstname} username={props.userId.username} picture={props.userId.picture}
                />
            </div>
            <div className={styles.listItemMessage}>
                {props.comment}
            </div>
            <div className={styles.iconContainer}>
                <FontAwesomeIcon icon={faCircleExclamation} onClick={() => openSignalementModal()} className={styles.icon} />
                {isCommentPoster && (
                    <FontAwesomeIcon icon={faTrash} className={styles.icon} onClick={removeComment} />
                )}
            </div>
            <SignalementModal isOpen={modalIsOpen}
                onRequestClose={closeSignalementModal}
                userId={props.userId}
                comment={props.comment}
                idProject={props.idProject}
            />
        </div>

    );
}

export default MessageCard;
