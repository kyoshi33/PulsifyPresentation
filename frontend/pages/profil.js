import styles from '../styles/Profil.module.css';
import { login } from '../reducers/user';


function Profil() {



  return (
    <div className={styles.container}>

      <div className={styles.onglet}>

        <div className={styles.bibliotheque}>
          Ma bibliotheque
        </div>
        <div className={styles.favoris}>
          Favoris

        </div>


      </div>


      <div className={styles.boxes}>
        <div className={styles.box}>


        </div>

      </div>


      <button className={styles.btnRetour} onClick={() => window.location.href = '/'}>Retour</button>
    </div >
  );
}

export default Profil;