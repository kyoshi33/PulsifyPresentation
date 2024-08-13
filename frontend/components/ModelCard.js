import styles from '../styles/ModelCard.module.css';
import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faCircleExclamation, faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

function ModelCard(props) {
    const user = useSelector((state) => state.user.value)

    let removeButton = <></>
    props.isOwnGenre && (removeButton =
        <div className={styles.trashIcon} onClick={() => props.handleRemoveGenre(props.genre)}>
            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
        </div>)

    return (
        <button className={styles.listItemContainer}>
            <div className={styles.author} onClick={() => props.handleClick(props.genre)}>
                <UserCard username={props.username} firstname={props.firstname} picture={props.picture} ></UserCard>
            </div>
            <div className={styles.genre} onClick={() => props.handleClick(props.genre)}>{props.genre}</div>
            <div className={styles.listItemPrompt} onClick={() => props.handleClick(props.genre)}>{props.projects}</div>
            {removeButton}
        </button>

    );
}

export default ModelCard;
