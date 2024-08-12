import styles from '../styles/Profil.module.css';
import User, { login } from '../reducers/user';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import user from '../reducers/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../reducers/user';
import UserCard from '../components/UserCard';
import { faArrowRightFromBracket, faPlay, faPause, faUser } from '@fortawesome/free-solid-svg-icons'
import PromptCard from '../components/PromptCard'
import Image from 'next/image';

function Profil() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)
  const [selectedTab, setSelectedTab] = useState(1);
  const [maBibliotheque, setMaBibliotheque] = useState(true);
  const [community, setCommunaute] = useState(false);
  const [listMesModeles, setMyPrompts] = useState([]);
  const [listCommunaute, setListCommunaute] = useState([]);


  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  }
  //fonction supprime un prompt
  // const removePrompt = () => {
  //   (prompts, id) => {
  //     return ''.filter(prompts => prompts.id !== id);
  //   };
  // }

  // //fonction lancer un prompt
  // const playPrompt = () => {
  //   (cards, id) => {
  //   };
  // }

  //fonction card ma bibliotheque

  const clickBibliotheque = () => {
    fetch('http://localhost:3000/users/projets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, token: user.token })
    })
      .then(response => response.json())
      .then(data => {
        if (!data) {
          Error('Erreur lors de la récupération des prompts');
        } else {
          setMyPrompts(data.profil.prompts)
          setListCommunaute(data.profil.likedprompts)
        }

      });
  }
  useEffect(() => {
    clickBibliotheque();
  }, []);


  //fonction pour exclure l'element supprimé// inverse data flow avec promptCard
  const handleUpdate = (id) => {
    const newModeles = listMesModeles.filter(model => model._id !== id);
    setMyPrompts(newModeles);
  };


  let listBibliotheque = listMesModeles.map((data, i) => { return (<div className={styles.promptCard}><PromptCard className={styles.insidePromptCard} isOnProfile={true} stars={data.rating} projectName={data.title} prompt={data.prompt} id={data._id} genre={data.genre} onRemove={() => handleUpdate(data._id)} /></div>) })
  const communityMap = listCommunaute.map((data, i) => { return (<div className={styles.promptCard}><PromptCard className={styles.insidePromptCard} isOnProfile={true} stars={data.rating} projectName={data.title} prompt={data.prompt} id={data._id} genre={data.genre} onRemove={() => handleUpdate(data._id)} /></div>) })

  let display =
    <div className={styles.modelChoiceContainer}>
      {listBibliotheque}
    </div>
  if (maBibliotheque) {
    display =
      <div className={styles.modelChoiceContainer}>
        <div className={styles.scrollWindow}>
          <div className={styles.promptCard} >
            {listBibliotheque}
          </div>
        </div>
      </div>
  } else if (community) {
    display =
      <div className={styles.modelChoiceContainer}>
        <div className={styles.scrollWindow}>
          <div className={styles.promptCard} >
            {communityMap}
          </div>
        </div>
      </div>
  }


  // let listBibliotheque = listMesModeles.map((data, i) => {
  //   return (<div className={styles.modelChoiceContainer}>
  //     <div className={styles.scrollWindow}>
  //       <button className={styles.listItemContainer}>
  //         <div className={styles.listItemTitle}>
  //          { data.}
  //         </div>
  //         <div className={styles.listItemPrompt}>
  //           { data.}
  //         </div>
  //       </button>
  //     </div>
  //   </div>
  //   )
  // })


  return (
    <div className={styles.container}>

      <div className={styles.headerProfile}>
        <Image src={user.picture ? user.picture : null} width={150} height={150} className={styles.profilPicture} />
        <div className={styles.usernameAndName}> {user.firstname}
          <span className={styles.username}>@{user.username}</span>
        </div>
        <FontAwesomeIcon icon={faArrowRightFromBracket} className={styles.btnLogOut} onClick={() => handleLogout()} />
      </div>


      <div className={styles.selectModelContainer}>
        <div className={styles.tabBar}>
          <div className={selectedTab === 1 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(1); setMaBibliotheque(true); setCommunaute(false) }}>
            Mes projets
          </div>
          <div className={selectedTab === 2 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(2); setCommunaute(true); setMaBibliotheque(false) }} >
            Projets favoris
          </div>
        </div>
        <div className={styles.display}>
          {display}
        </div>
      </div>


      <div className={styles.footer}>
        <div className={styles.btn} onClick={() => window.location.href = '/'}>
          Retour
        </div>
      </div>


    </div >
  );
}

export default Profil;

/*<div className={styles.tabBar}>
        <div className={selectedTab === 1 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(1); setMaBibliotheque(true); setCommunaute(false) }}>
          Ma bibliothèque
        </div>
        <div className={selectedTab === 2 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(2); setCommunaute(true); setMaBibliotheque(false) }} >
          Bibliothèque de la communauté
        </div>
      </div>



      {display}



      <div className={styles.btn}>
        <button className={styles.btnRetour} onClick={() => window.location.href = '/'}>Retour</button>
      </div>*/