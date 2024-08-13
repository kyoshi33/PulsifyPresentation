import React from "react";
import Modal from 'react-modal';
import styles from '../styles/ProjectModal.module.css';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";




function ProjectModal(props) {

    const [isPublic, setIsPublic] = useState(false)

    const [displayMessage, setDisplayMessage] = useState('');
    const [hoveredStars, setHoveredStars] = useState(0);
    const [score, setScore] = useState(0);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const user = useSelector((state) => state.user.value);
    console.log(props)

    const getFile = (event) => {
        setFile(event.target.files[0]);
    };

    const upload = async () => {
        if (!file) {
            setMessage('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('audio', file);



        const result = await response.json();

        if (response.ok) {
            setMessage(result.message);
            setAudioUrl(result.url);
        } else {
            setMessage('Upload failed');
        }

    }


    const uploadPrompt = async (files) => {
        console.log('token :', user.token)
        if (user.token) {

            score === 0 && (setDisplayMessage('Merci de renseigner une note !'));

            const dataForPrompt = {
                genre: props.projectGenre,
                prompt: props.prompt,
                audio: formData,
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
                console.log('c good, project enregistré', saveDataForPrompt)
                window.location.href = "./Profil"
            }
        }


        const mouseOver = (rating) => {
            setHoveredStars(rating);
        };

        const mouseLeave = () => {
            setHoveredStars(0);
        };

        const clickToRate = (rating) => {
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
                        {/* <input className={styles.inputImport} type="file" onChange={(e) => { setTempAudioFile(e.target.files); console.log(tempAudioFile) }} /> */}

                        <h2>Importez l'audio</h2>
                        <input type="file" className={styles.inputImport} onChange={getFile} accept="audio/*" />
                        <button onClick={upload}>Upload</button>
                        {message && <p>{message}</p>}


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
                                        onClick={() => clickToRate(star)}
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
                        <button className={styles.btn} onClick={() => {
                            // uploadPrompt(tempAudioFile);
                            // score !== 0 &&  

                        }}>Valider</button>
                    </div>
                    <span className={styles.errorMessage}>{displayMessage}</span>
                </div>
            </Modal>
        )

    }
}
export default ProjectModal