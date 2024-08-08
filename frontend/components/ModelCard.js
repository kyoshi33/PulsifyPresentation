import styles from '../styles/ModelCard.module.css';
import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faCircleExclamation, faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';


function ModelCard(props) {
    const user = useSelector((state) => state.user.value)


    return (
        <button className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
                Rockabilly
            </div>
            <div className={styles.genre}>{props.genre}</div>
            <div className={styles.listItemPrompt}>
                Jazz, rock, musette, flute
            </div>
        </button>

    );
}

export default ModelCard;
