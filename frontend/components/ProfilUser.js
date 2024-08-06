import styles from '../styles/Profil.module.css';
import { useSelector } from 'react-redux';




function ProfilUser(props) {
  const user = useSelector((state) => state.user.value)

  let profil =
    <div className={styles.profilesContainer}>
      <div className={styles.profilesPic}>
        <img className={styles.profilesPic} src="photo1.png" alt='photo de profil' />
        <h3 className={styles.identifiant}> {props.username}</h3>
        <h4 className={styles.identifiant}>@:{props.email}</h4>
      </div>

    </div>



  return (
    <>
      {profil}
    </>
  );
}

export default ProfilUser;
