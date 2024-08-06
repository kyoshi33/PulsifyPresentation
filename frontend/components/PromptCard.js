import styles from '../styles/PromptCard.module.css';
import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faCircleExclamation, faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';


function PromptCard(props) {
    const user = useSelector((state) => state.user.value)


    return (
        <div className={styles.promptContainer}>

            <div className={styles.itemContainer}>

                <div className={styles.titleBox}>

                    <div className={styles.titleBackground}>
                        <div className={styles.title}>
                            {props.projectName}
                        </div>
                    </div>

                    <div className={styles.score}>
                        <FontAwesomeIcon icon={faStar} className={props.stars >= 1 ? styles.star : styles.starGrey} />
                        <FontAwesomeIcon icon={faStar} className={props.stars >= 2 ? styles.star : styles.starGrey} />
                        <FontAwesomeIcon icon={faStar} className={props.stars >= 3 ? styles.star : styles.starGrey} />
                        <FontAwesomeIcon icon={faStar} className={props.stars >= 4 ? styles.star : styles.starGrey} />
                        <FontAwesomeIcon icon={faStar} className={props.stars === 5 ? styles.star : styles.starGrey} />
                    </div>

                </div>

                <div className={styles.itemPrompt}>
                    {props.prompt}
                </div>
                <div className={styles.iconsBox}>
                    <FontAwesomeIcon icon={faPlay} className={styles.icon} />
                    <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                    <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                </div>

            </div>

        </div >

    );
}

export default PromptCard;
