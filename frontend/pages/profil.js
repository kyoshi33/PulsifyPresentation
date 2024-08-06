import styles from '../styles/Profil.module.css';
import { login } from '../reducers/user';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import user from '../reducers/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../reducers/user';


function Profil() {



  const [selectProfile, selectedProfile] = useState(null)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)
  const [selectedTab, setSelectedTab] = useState(1);



  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '../Accueil';

  }
  const clickBibliotheque = () => {

  }

  const clickFavoris = () => {

  }

  const profiles = [
    'photo1.png',
    'photo2.png',
    'photo3.png',
  ];

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };



  return (
    <div className={styles.container}>


      <div className={styles.profilesContainer}>


        <div className={styles.profilesPic}>
          <img className={styles.profilesPic} src="photo1.png" alt='photo de profil' />
          <h3 className={styles.identifiant}> {user.username}</h3>
          <h4 className={styles.identifiant}>@{user.email}</h4>
          <button className={styles.btnLogOut} onClick={() => handleLogout()}>LogOut</button>
        </div>

      </div>

      <div className={styles.tabBar}>
        <div className={selectedTab === 1 ? styles.selectedTab : styles.tab} onClick={() => setSelectedTab(1)}>
          Ma bibliotheque
        </div>
        <div className={selectedTab === 2 ? styles.selectedTab : styles.tab} onClick={() => setSelectedTab(2)} >
          Mes Favoris
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