import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from '../styles/ProjectModal.module.css';
import { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";




function ProjectModal(props) {

    const [audio, setAudio] = useState(null);
    const [isPublic, setIsPublic] = useState(false)
    const [tempAudioFile, setTempAudioFile] = useState(null)
    const [score, setScore] = useState(0);
    const [displayMessage, setDisplayMessage] = useState('');

    const user = useSelector((state) => state.user.value);



    const uploadPrompt = async (files) => {
        const formData = new FormData();
        const cloudinaryPresset = process.env.NEXT_PUBLIC_PRESSET_CLOUDINARY;


        if (files) {
            formData.append("file", files[0]);
            formData.append("upload_preset", cloudinaryPresset);
            fetch("https://api.cloudinary.com/v1_1/duiieokac/video/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setAudio(data.secure_url);

                });
        }

        score === 0 && (setDisplayMessage('Merci de renseigner une note !'));

        const dataForPrompt = {
            genre: props.projectTitle,
            prompts: props.prompt,
            audio: audio,
            rating: score,
            isPublic: isPublic,
            username: user.username,
            email: user.email,

        }

        if (score != 0) {
            const saveDataForPrompt = await fetch("http://localhost:3000/prompts", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataForPrompt)
            })
        }

    };

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
                <p className={styles.promptContainer}>{props.prompt}</p>
                <div className={styles.import}>
                    <input className={styles.inputImport} type="file" onChange={(e) => { setTempAudioFile(e.target.files); console.log(tempAudioFile) }} />
                </div>
                <div className={styles.voteContainer}>
                    <p className={styles.voteTxt}>Votre note :</p>
                    <div className={styles.voteStars}>
                        <FontAwesomeIcon
                            icon={faStar}
                            className={score >= 1 ? styles.colorThemeIcon : styles.colorThemeIconInactive}
                            onMouseOver={() => setScore(1)}
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className={score >= 2 ? styles.colorThemeIcon : styles.colorThemeIconInactive}
                            onMouseOver={() => setScore(2)}
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className={score >= 3 ? styles.colorThemeIcon : styles.colorThemeIconInactive}
                            onMouseOver={() => setScore(3)}
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className={score >= 4 ? styles.colorThemeIcon : styles.colorThemeIconInactive}
                            onMouseOver={() => setScore(4)}
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className={score >= 5 ? styles.colorThemeIcon : styles.colorThemeIconInactive}
                            onMouseOver={() => setScore(5)}
                        />
                    </div>
                </div>
                <div className={styles.modalBtnContainer}>
                    <div className={styles.public}>
                        <div className={isPublic === true ? styles.isPublic : styles.isNotPublic} onClick={() => setIsPublic(!isPublic)}>
                        </div>
                        <span className={styles.text}>Public</span>
                    </div>
                    <button className={styles.btn} onClick={props.onRequestClose}>Retour</button>
                    <button className={styles.btn} onClick={() => { uploadPrompt(tempAudioFile) }}>Valider</button>
                </div>
                <span className={styles.errorMessage}>{displayMessage}</span>
            </div>
        </Modal>
    )
}

export default ProjectModal