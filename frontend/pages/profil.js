import styles from '../styles/Profil.module.css';
import { login } from '../reducers/user';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import user from '../reducers/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../reducers/user';
import ProfilUser from '../components/ProfilUser';


function Profil() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)
  const [selectedTab, setSelectedTab] = useState(1);
  const [maBibliotheque, setMaBibliotheque] = useState(true);
  const [communaute, setCommunaute] = useState(false);

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

  if (communaute) {
    display =

      <div className={styles.boxes}>
        <div className={styles.box}>
          <h4>TEST</h4>
        </div>
      </div>
  }

  /*fonction card ma bibliotheque
  const clickBibliotheque = () => {
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email })
    })
      .then(response => response.json())
      .then(data => {
        if (!data) {
          Error('Erreur lors de la récupération des prompts');
        } else {
          setMaBibliotheque(data.prompts)
        }
      });
  }
  
  fonction card ma bibliotheque
  const clickFavoris = () => {
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email })
    })
      .then(response => response.json())
      .then(data => {
        if (!data) {
          Error('Erreur lors de la récupération des likedprompts');
        } else {
          setMaBibliotheque(data.likedprompts)
        }
      });
  }
      <div className={styles.profilesContainer}>


        <div className={styles.profilesPic}>

          <img className={styles.profilesPic} src="photo1.png" alt='photo de profil' />
          <h3 className={styles.identifiant}> {user.username}</h3>
          <h4 className={styles.identifiant}>@:{user.email}</h4>
          <button className={styles.btnLogOut} onClick={() => handleLogout()}>LogOut</button>
        </div>

      </div>
  */




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
        <div className={selectedTab === 1 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(1); setMaBibliotheque(true); setCommunaute(false) }}>
          Ma bibliothèque
        </div>
        <div className={selectedTab === 2 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(2); setCommunaute(true); setMaBibliotheque(false) }} >
          Bibliothèque de la communauté
        </div>
      </div>



      {display}




      <button className={styles.btnRetour} onClick={() => window.location.href = '/'}>Retour</button>
    </div >
  );
}

export default Profil;

