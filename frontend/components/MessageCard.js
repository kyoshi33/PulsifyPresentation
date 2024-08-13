import styles from '../styles/MessageCard.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import SignalementModal from './SignalementModal';
import UserCard from './UserCard'


function MessageCard(props) {

    const [modalIsOpen, setIsOpen] = useState(false);

    const openSignalementModal = () => {
        setIsOpen(true)
    }

    const closeSignalementModal = () => {
        setIsOpen(false)
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
            <FontAwesomeIcon icon={faCircleExclamation} onClick={() => openSignalementModal()} className={styles.icon} />
            <SignalementModal isOpen={modalIsOpen}
                onRequestClose={closeSignalementModal}
                id={props.id}
            />
        </div>

    );
}

export default MessageCard;
