import styles from "../styles/Accueil.module.css"
import { useEffect, useState } from 'react';
import Link from "next/link";


import Header from "../components/Header";

let connected = false;

function Accueil() {

    const [newProject, setNewProject] = useState(false);
    const [newExistingProject, setNewExistingProject] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedTab, setSelectedTab] = useState(1);

    let display =
        <div className={styles.container}>
            <div className={styles.choiceContainer}>
                <button className={styles.createBtn} onClick={() => setNewProject(true)}>Nouveau projet</button>
            </div>
            <Link href='Explorer'>
                <button className={styles.exploreBtn}>Explorer</button>
            </Link>
        </div>

    if (newProject) {
        display =
            <>
                <div className={styles.selectModelContainer}>
                    <div className={styles.choiceContainer}>
                        <button className={styles.createBtn} onClick={() => setNewExistingProject(true)}>Utiliser un modèle existant</button>
                        <Link href='/Project'>
                            <button className={styles.createBtn}>Démarrer un projet vierge</button>
                        </Link>
                    </div>
                    <Link href='Explorer'>
                        <button className={styles.exploreBtn}>Explorer</button>
                    </Link>
                </div>
            </>
    }



    if (newExistingProject) {
        display =
            <div className={styles.container} >
                <div className={styles.title}>Sélectionnez un modèle enregistré</div>
                <div className={styles.selectModelContainer}>
                    <div className={styles.tabBar}>
                        <div className={selectedTab === 1 ? styles.selectedTab : styles.tab} onClick={() => setSelectedTab(1)}>
                            Mes modèles
                        </div>
                        <div className={selectedTab === 2 ? styles.selectedTab : styles.tab} onClick={() => setSelectedTab(2)} >
                            Communauté
                        </div>
                    </div>
                    <div className={styles.modelChoiceContainer}>

                        <input type='string' placeholder='Recherche...' onChange={(e) => setSearch(e.target.value)} value={search} className={styles.inputSearch} />

                        <div className={styles.scrollWindow}>

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
                </div>
                <button className={styles.exploreBtn} onClick={() => { setNewProject(false); setNewExistingProject(false) }}>Retour</button>
            </div >

    }




    return (
        <>
            <Header></Header>
            {display}
        </>
    )
}

export default Accueil;
