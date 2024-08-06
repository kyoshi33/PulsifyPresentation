import styles from "../styles/Explorer.module.css"
import Header from "../components/Header";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

function Explorer() {
    const [search, setSearch] = useState('')

    return (
        <>
            <div className={styles.container}>
                <Header></Header>

                <h1 className={styles.title}>Explorer</h1>
                <div className={styles.modelChoiceContainer}>

                    <div className={styles.containerSearch}>
                        <input type='string' placeholder='Recherche...' onChange={(e) => setSearch(e.target.value)} value={search} className={styles.inputSearch} />
                        <div className={styles.containerIcon}>
                            <FontAwesomeIcon icon={faFilter} className={styles.icon} />
                            <FontAwesomeIcon icon={faSortAmountUp} className={styles.icon} />
                            <FontAwesomeIcon icon={faSortAmountDown} className={styles.icon} />
                        </div>
                    </div>

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
                <button className={styles.btnRetour} onClick={() => window.location.href = '/Accueil'}>Retour</button>
            </div>

        </>
    )
}

export default Explorer;