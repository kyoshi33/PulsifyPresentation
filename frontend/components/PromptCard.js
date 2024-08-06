import styles from '../styles/PromptCard.module.css';
import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faCircleExclamation, faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';


function PromptCard() {
    const user = useSelector((state) => state.user.value)


    return (
        <div className={styles.promptContainer}>

            <div className={styles.itemContainer}>

                <div className={styles.titleBox}>

                    <div className={styles.title}>
                        Rockabilly
                    </div>

                    <div className={styles.score}>
                        <FontAwesomeIcon icon={faStar} className={styles.star} />
                        <FontAwesomeIcon icon={faStar} className={styles.star} />
                        <FontAwesomeIcon icon={faStar} className={styles.star} />
                        <FontAwesomeIcon icon={faStar} className={styles.star} />
                        <FontAwesomeIcon icon={faStar} className={styles.starWhite}></FontAwesomeIcon>
                    </div>

                </div>

                <div className={styles.itemPrompt}>
                    Jazz, rock, musette, flute
                </div>
                <div className={styles.iconsBox}>
                    <FontAwesomeIcon icon={faPlay} className={styles.icon} />
                    <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                    <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                </div>

            </div>

        </div>

    );
}

export default PromptCard;
