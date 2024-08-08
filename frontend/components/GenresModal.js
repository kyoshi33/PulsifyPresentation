import React from "react";
import Modal from 'react-modal';
import styles from '../styles/GenresModal.module.css';
import { Component, useState } from 'react';

function GenresModal(props) {
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
                    <div className={styles.genresBtn}>Rock </div>
                    <div className={styles.genresBtn}>Folk </div>
                    <div className={styles.genresBtn}>Classic </div>
                    <div className={styles.genresBtn}>Jazz </div>
                    <div className={styles.genresBtn}>Indie </div>
                    <div className={styles.genresBtn}>Transe </div>
                    <div className={styles.genresBtn}>Drum'n'Bass </div>
                    <div className={styles.genresBtn}>Couilles </div>
                    <div className={styles.genresBtn}>Chocolat </div>
                </div>

            </div>
        </Modal>
    )
}


export default GenresModal