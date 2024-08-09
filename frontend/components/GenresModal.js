import React, { useEffect } from "react";
import Modal from 'react-modal';
import styles from '../styles/GenresModal.module.css';
import { Component, useState } from 'react';

function GenresModal(props) {
    const [genresList, setGenresList] = useState(["Rock", "Folk", "Classic", "Jazz", "Indie", "Transe", "Drum'n'Bass", "Couilles", "Chocolat"])


    useEffect(() => {
        const fetchAllGenres = async () => {
            const fetchGenres = await fetch('http://localhost:3000/genres')
            const resGenre = await fetchGenres.json()
            setGenresList(resGenre)
        }

    }, [])


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
                    <div className={styles.modalTitle}>Vos genres favoris</div>

                </div>
                <div className={styles.genresContainer}>
                    {genreButtons}
                </div>
                <div className={styles.bottomGenreModal}>
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" className={styles.checkBoxSuggestion} />
                        <span className={styles.customCheckbox}></span>
                        Intégrez les favoris de la communauté
                    </label>
                </div>
            </div>
        </Modal>
    )
}


export default GenresModal