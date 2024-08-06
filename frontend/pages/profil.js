import styles from '../styles/Profil.module.css';
import { login } from '../reducers/user';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import user from '../reducers/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../reducers/user';


function Profil() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)
  const [selectedTab, setSelectedTab] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState("")
  const [maBibliotheque, setMaBibliotheque] = useState(true);
  const [mesFavoris, setMesFavoris] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '../Accueil';
  }


  let display =
    <div className={styles.boxes}>
      <div className={styles.box}>
      </div>
    </div>

  if (maBibliotheque) {
    display =

      <div className={styles.boxes}>
        <div className={styles.box}>
          <h4>TEST 3</h4>
        </div>
      </div>
  }

  if (mesFavoris) {
    display =

      <div className={styles.boxes}>
        <div className={styles.box}>
          <h4>TEST</h4>
        </div>
      </div>
  }

  const clickBibliotheque = () => {

  }

  const clickFavoris = () => {

  }









  return (
    <div className={styles.container}>


      <div className={styles.profilesContainer}>


        <div className={styles.profilesPic}>

          <img className={styles.profilesPic} src="photo1.png" alt='photo de profil' />
          <h3 className={styles.identifiant}> {user.username}</h3>
          <h4 className={styles.identifiant}>@:{user.email}</h4>
          <button className={styles.btnLogOut} onClick={() => handleLogout()}>LogOut</button>
        </div>

      </div>



      <div className={styles.tabBar}>
        <div className={selectedTab === 1 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(1); setMaBibliotheque(true); setMesFavoris(false) }}>
          Ma bibliotheque
        </div>
        <div className={selectedTab === 2 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(2); setMesFavoris(true); setMaBibliotheque(false) }} >
          Mes Favoris
        </div>
      </div>



      {display}




      <button className={styles.btnRetour} onClick={() => window.location.href = '/'}>Retour</button>
    </div >
  );
}

export default Profil;

