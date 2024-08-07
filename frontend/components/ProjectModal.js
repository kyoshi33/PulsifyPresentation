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
    const user = useSelector((state) => state.user.value);


    const uploadPrompt = async (files) => {
        const formData = new FormData();

        if (files) {
            formData.append("file", files[0]);
            formData.append("upload_preset", "ml_default");
            fetch("https://api.cloudinary.com/v1_1/duiieokac/video/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setAudio(data.secure_url);

                });
        }

        const dataForPrompt = {
            genre: props.projectTitle,
            prompts: props.prompt,
            audio: audio,
            rating: 5,
            isPublic: isPublic,
            username: user.username,
            email: user.email,

        }
        const saveDataForPrompt = await fetch("http://localhost:3000/prompts", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataForPrompt)
        })
        console.log(saveDataForPrompt)

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
                    <div className={styles.public}>
                        <div className={isPublic === true ? styles.isPublic : styles.isNotPublic} onClick={() => setIsPublic(!isPublic)}>
                        </div>
                        <span className={styles.text}>Public</span>
                    </div>
                    <button className={styles.btn} onClick={props.onRequestClose}>Retour</button>
                    <button className={styles.btn} onClick={() => { uploadPrompt(tempAudioFile) }}>Valider</button>
                </div>
            </div>
        </Modal>
    )
}

export default ProjectModal