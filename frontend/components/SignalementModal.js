import styles from '../styles/Signalement.module.css';
import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';




function SignalementModal(props) {
  const handleValidation = async () => {
    try {
      const response = await fetch(`http://localhost:3000/projects/signalement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        Error('Erreur lors de la validation du signalement');
      }
      const data = await response.json();
      console.log('Signalement mis à jour :', data);

    } catch (error) {
      console.error('Erreur:', error);
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
          <h1 className={styles.modalTitle}>Signalement</h1>
        </div>
        <div>
          <p className={styles.text}>Signalez un commentaire innaproprié ou offensant </p>
        </div>
        <div className={styles.promptContainer} >
          <textarea placeholder="Expliquer votre signalement ici..." className={styles.input}>
          </textarea>
        </div>
        <div className={styles.modalBtnContainer}>
          <button className={styles.btn} onClick={props.onRequestClose}>Annuler</button>
          <button className={styles.btn} onClick={handleValidation}>Valider</button>
        </div>
      </div>
    </Modal >


  )
}



export default SignalementModal;
