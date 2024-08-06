import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from '../styles/ProjectModal.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';


function ProjectModal(props) {
    return (
        <Modal
            isOpen={props.isOpen}
            className={styles.modalContainer}

            contentLabel="Example Modal">
            <div className={styles.content}>
                <div className={styles.modalTitleContent}>
                    <h1 className={styles.modalTitle}>Nom du projet</h1>

                </div>
                <p className={styles.promptContainer}>exemple de prompt, Rock, Jazz, électronique...</p>
                <button className={styles.btn}>Importer la musique généré par Suno</button>
                <div className={styles.voteContainer}>
                    <p className={styles.voteTxt}>Votre note :</p>
                    <div className={styles.voteTxt}>
                        <FontAwesomeIcon
                            icon={faStar}
                            className={styles.colorThemeIcon}
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className={styles.colorThemeIcon}
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className={styles.colorThemeIcon}
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className={styles.colorThemeIcon}
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className={styles.colorThemeIcon}
                        />
                    </div>
                    <div className={styles.modalBtnContainer}>
                        <button onClick={props.onRequestClose}>Retour</button>
                        <button>Valider</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ProjectModal