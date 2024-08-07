import styles from '../styles/Signalement.module.css';
import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from '../styles/ProjectModal.module.css';



function SignalementModal(props) {


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
        <div className={styles.modalBtnContainer}>
          <button className={styles.btn} onClick={props.onRequestClose}>Retour</button>
          <button className={styles.btn} onClick={() => { uploadPrompt(tempAudioFile) }}>Valider</button>
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
</body>*/

export default SignalementModal;
