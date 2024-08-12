import styles from '../styles/Signalement.module.css';
import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useState } from 'react';




function SignalementModal(props) {
  const [commentaire, setCommentaire] = useState('')

  const handleValidation = async () => {
    try {
      const signalement = await fetch(`http://localhost:3000/projects/signalementProject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idPrompt: props.id, text: commentaire }),
      });
      const response = await signalement.json()
      props.onRequestClose()
      if (!response.result) {
        Error('Erreur lors de la validation du signalement');
      } else {
        console.log('Signalement mis à jour');
      }
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
          <textarea placeholder="Expliquer votre signalement ici..." className={styles.input} onChange={e => setCommentaire(e.target.value)} value={commentaire}>
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
