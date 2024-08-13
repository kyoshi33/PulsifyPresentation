import styles from '../styles/Profil.module.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';





function UserCard(props) {
  const user = useSelector((state) => state.user.value)
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
