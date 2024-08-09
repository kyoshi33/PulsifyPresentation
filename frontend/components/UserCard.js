import styles from '../styles/Profil.module.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'




function UserCard(props) {
  const user = useSelector((state) => state.user.value)
  let profil =
    <div className={styles.profilesContainer}>
      {user.picture ? <Image className={styles.profilPicture} src={user.picture} width={"80%"} height={"80%"} alt="Picture of the author" /> : <FontAwesomeIcon icon={faUser} className={styles.icon} />}


      <div className={styles.namediv}>
        <h3 className={styles.nom}> {props.firstname}</h3>
        <h4 className={styles.identifiant}>@{props.username}</h4>
      </div>
    </div>



  return (
    <>
      {profil}
    </>
  );
}

export default UserCard;
