import React from "react";
import Modal from 'react-modal';
import styles from '../styles/ProjectModal.module.css';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";




function ProjectModal(props) {
    const [audio, setAudio] = useState(null);
    const [isPublic, setIsPublic] = useState(false)
    const [tempAudioFile, setTempAudioFile] = useState(null)
    const [displayMessage, setDisplayMessage] = useState('');
    const [hoveredStars, setHoveredStars] = useState(0);
    const [score, setScore] = useState(0);

    const user = useSelector((state) => state.user.value);
    console.log(props)

    const uploadPrompt = async (files) => {
        if (user.token) {

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
                genre: props.projectGenre,
                prompt: props.prompt,
                audio: audio,
                rating: score,
                isPublic: isPublic,
                username: user.username,
                email: user.email,
                token: user.token,
                title: props.projectTitle

            }

            if (score != 0) {
                const saveDataForPrompt = await fetch("http://localhost:3000/projects/add", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataForPrompt)
                })
            }
        }
    };

    const mouseOver = (rating) => {
        setHoveredStars(rating);
    };

    const mouseLeave = () => {
        setHoveredStars(0);
    };

    const click = (rating) => {
        setScore(rating);

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
                <div className={styles.voteTxt}>genre du projet : {props.projectGenre}</div>
                <p className={styles.promptContainer}>{props.prompt}</p>
                <div className={styles.import}>
                    <input className={styles.inputImport} type="file" onChange={(e) => { setTempAudioFile(e.target.files); console.log(tempAudioFile) }} />
                </div>
                <div className={styles.voteContainer}>
                    <p className={styles.voteTxt}>Votre note :</p>
                    <div className={styles.voteStars}>

                        {[1, 2, 3, 4, 5].map((star) => {
                            const isStarSelected = score >= star;
                            const isStarHovered = hoveredStars >= star;

                            let color = "gray"; // Couleur par défaut

                            if (isStarHovered && !isStarSelected) {
                                color = "white"; // Couleur lors du survol
                            } else if (isStarSelected) {
                                color = "#B300F2"; // Couleur lorsqu'une étoile est cliquée
                            }

                            return (
                                <FontAwesomeIcon
                                    icon={faStar}
                                    style={{ color: color }}
                                    onMouseEnter={() => mouseOver(star)}
                                    onMouseLeave={mouseLeave}
                                    onClick={() => click(star)}
                                />
                            );
                        })}

                    </div>
                </div>
                <div className={styles.modalBtnContainer}>
                    <div className={styles.public}>
                        <div className={isPublic === true ? styles.isPublic : styles.isNotPublic} onClick={() => setIsPublic(!isPublic)}>
                        </div>
                        <span className={styles.text}>Public</span>
                    </div>
                    <button className={styles.btn} onClick={props.onRequestClose}>Retour</button>
                    <button className={styles.btn} onClick={() => { uploadPrompt(tempAudioFile); window.location.href = "./Profil" }}>Valider</button>
                </div>
                <span className={styles.errorMessage}>{displayMessage}</span>
            </div>
        </Modal>
    )
}

export default ProjectModal