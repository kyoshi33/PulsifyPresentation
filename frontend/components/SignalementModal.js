import styles from '../styles/Signalement.module.css';
import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';




function SignalementModal(props) {


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
          <button className={styles.btn} onClick={() => { }}>Valider</button>
        </div>
      </div>
    </Modal>


  )
}


/*<body className={styles.main}>
<div className={styles.container}>
  <h1 className={styles.title}>Signalement</h1>
  <div>
    <p className={styles.text}>Signalez un commentaire innaproprié ou offensant </p>
  </div>
  <div className={styles.inputContainer} >
    <textarea placeholder="Expliquer votre signalement ici..." className={styles.input}>
    </textarea>
  </div>
  <div className={styles.footer}>
    <div className={styles.btn} onClick={() => window.location.href = '/'}>
      Annuler
    </div>
    <div className={styles.btn}>Valider</div>
  </div>

</div>
</body>






*/

export default SignalementModal;
