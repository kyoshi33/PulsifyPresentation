import styles from '../styles/Profil.module.css';
import User, { login } from '../reducers/user';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import user from '../reducers/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../reducers/user';
import UserCard from '../components/UserCard';
import { faArrowRightFromBracket, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import PromptCard from '../components/PromptCard'


function Profil() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)
  const [selectedTab, setSelectedTab] = useState(1);
  const [maBibliotheque, setMaBibliotheque] = useState(true);
  const [communaute, setCommunaute] = useState(false);
  const [listMesModeles, setListMesModeles] = useState([]);


  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  }
  // fonction supprime un prompt
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
    fetch('http://localhost:3000/users/modeles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email })
    })

      .then(response => response.json())

      .then(data => {
        if (!data) {
          Error('Erreur lors de la récupération des prompts');
        } else {
          setListMesModeles(data.profil)
        }
        console.log(listMesModeles)
      });
  }


  // let listBibliotheque = listMesModeles.map((data, i) => { return (<div className={styles.test}><PromptCard key={i} stars={data.rating} projectName={data.genre} prompt={data.prompts} name={data.username} /></div>) })
  // console.log(listBibliotheque)

  let display =
    <div className={styles.modelChoiceContainer}>
    </div>

  if (maBibliotheque) {
    display =
      <div className={styles.modelChoiceContainer}>
        <div className={styles.scrollWindow}>
          <div className={styles.promptCard} >
            <PromptCard isOnProfile={true} id="track1" stars={4} projectName={'Funk'} prompt={'Guitar, slap bass, funky, dj'} />
            <PromptCard isOnProfile={true} id="track2" stars={4} projectName={'Funk'} prompt={'Guitar, slap bass, funky, dj'} />
            <PromptCard isOnProfile={true} id="track3" stars={4} projectName={'Funk'} prompt={'Guitar, slap bass, funky, dj'} />
            <PromptCard isOnProfile={true} id="track4" stars={4} projectName={'Funk'} prompt={'Guitar, slap bass, funky, dj'} />
            <PromptCard isOnProfile={true} id="track5" stars={4} projectName={'Funk'} prompt={'Guitar, slap bass, funky, dj'} />
          </div>
        </div>
      </div>
  }
  /*fonction card ma bibliotheque
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
         <div>
 
           <button className={styles.btnLogOut} onClick={() => handleLogout()}>LogOut</button>
         </div>
 
       </div>
   */

  if (communaute) {
    display =
      <div className={styles.modelChoiceContainer}>
        <div className={styles.scrollWindow}>
          <button className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
              Rockabilly
            </div>
            <div className={styles.listItemPrompt}>
              Jazz,rock, musette, flute
            </div>
          </button>
          <button className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
              Rock Indie
            </div>
            <div className={styles.listItemPrompt}>
              rock, electric guitar/bass/drums, pop,folk
            </div>
          </button>
          <button className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
              Modern classical
            </div>
            <div className={styles.listItemPrompt}>
              contemporary, mordern classical, XXcentury
            </div>
          </button>
          <button className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
              Rockabilly
            </div>
            <div className={styles.listItemPrompt}>
              Jazz, rock, musette, flute
            </div>
          </button>
          <button className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
              Rockabilly
            </div>
            <div className={styles.listItemPrompt}>
              Jazz, rock, musette, flute
            </div>
          </button>
          <button className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
              Rockabilly
            </div>
            <div className={styles.listItemPrompt}>
              Jazz, rock, musette, flute
            </div>
          </button>
          <button className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
              Rockabilly
            </div>
            <div className={styles.listItemPrompt}>
              Jazz, rock, musette, flute
            </div>
          </button>
          <button className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
              Rockabilly
            </div>
            <div className={styles.listItemPrompt}>
              Jazz, rock, musette, flute
            </div>
          </button>
        </div>
      </div>
  }








  return (
    <div className={styles.container}>

      <div className={styles.headerProfile}>
        <UserCard username={user.username} firstname={user.firstname} />
        <FontAwesomeIcon icon={faArrowRightFromBracket} className={styles.btnLogOut} onClick={() => handleLogout()} />
      </div>


      <div className={styles.selectModelContainer}>
        <div className={styles.tabBar}>
          <div className={selectedTab === 1 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(1); setMaBibliotheque(true); setCommunaute(false); clickBibliotheque() }}>
            Mes modèles
          </div>
          <div className={selectedTab === 2 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(2); setCommunaute(true); setMaBibliotheque(false) }} >
            Communauté
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