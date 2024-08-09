import React from "react";
import Modal from 'react-modal';
import styles from '../styles/GenresModal.module.css';
import { Component, useState } from 'react';

function GenresModal(props) {
    const [genresList, setGenresList] = useState(["Rock", "Folk", "Classic", "Jazz", "Indie", "Transe", "Drum'n'Bass", "Couilles", "Chocolat"])

    const handleClickOnGenre = (genre) => {
        props.handleGenreSelect(genre)
    }



    const genreButtons = genresList.map((genre, i) => {
        return (
            <div key={i} className={styles.genresBtn} onClick={() => handleClickOnGenre(genre)}>{genre}</div>
        )
    })

    return (
        <Modal
            isOpen={props.isOpen}
            className={styles.modalContainer}
            onRequestClose={props.onRequestClose}
            contentLabel="Example Modal">
            <div className={styles.content}>
                <div className={styles.modalTitleContent}>
                    <div className={styles.modalTitle}>Genres disponibles</div>

                </div>
                <div className={styles.genresContainer}>
                    {genreButtons}
                </div>

            </div>
        </Modal>
    )
}


export default GenresModal