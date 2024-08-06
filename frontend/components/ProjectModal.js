import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from '../styles/ProjectModal.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';

function ProjectModal(props) {

    const {
        acceptedFiles,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'audio/*': [],

        }
    });

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));



    return (
        <Modal
            isOpen={props.isOpen}
            className={styles.modalContainer}
            onRequestClose={props.onRequestClose}
            contentLabel="Example Modal">
            <div className={styles.content}>
                <div className={styles.modalTitleContent}>
                    <h1 className={styles.modalTitle}>{props.projectTitle}</h1>

                </div>
                <p className={styles.promptContainer}>Exemple de prompt, Rock, Jazz, électronique...</p>
                <div className={styles.import}>
                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p className={styles.dropzone}>Faites glisser et déposez votre fichier ici, ou cliquez pour sélectionner un fichier</p>
                            <em>(Seuls les fichiers MP3 sont acceptés)</em>
                        </div>
                        <aside>
                            <h4>Audio</h4>
                            <ul>{acceptedFileItems}</ul>
                        </aside>
                    </section>
                </div>
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
                </div>
                <div className={styles.modalBtnContainer}>
                    <button className={styles.btn} onClick={props.onRequestClose}>Retour</button>
                    <button className={styles.btn}>Valider</button>
                </div>
            </div>
        </Modal>
    )
}

export default ProjectModal