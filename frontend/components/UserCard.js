import styles from '../styles/Profil.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


//UserCard utilisée dans plusieurs partie du site pour display le nom d'un commentateur ou de l'auteur du projet
function UserCard(props) {
  const picture = props.picture === null ? <FontAwesomeIcon icon={faUser} className={styles.icon} height={50} width={50} /> : <img className={styles.profilesPic} src={props.picture} alt='photo de profil' />

  let profil =
    <div className={styles.profilesContainer}>
      {picture}
      <div className={styles.namediv}>
        <h3 className={styles.nom} > {props.firstname}</h3>
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
