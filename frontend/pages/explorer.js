import styles from "../styles/Explorer.module.css"
import Header from "../components/Header";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

function Explorer() {
    const [search, setSearch] = useState('')

    return (
        <>
            <Header></Header>
            <div className={styles.container}>
                <h1 className={styles.title}>Explorer</h1>
                <div className={styles.containerSearch}>
                    <input type='text' placeholder='Rechercher...' onChange={(e) => setSearch(e.target.value)} value={search} className={styles.input} />
                    <div className={styles.containerIcon}>
                        <FontAwesomeIcon icon={faFilter} className={styles.icon} />
                        <FontAwesomeIcon icon={faSortAmountUp} className={styles.icon} />
                        <FontAwesomeIcon icon={faSortAmountDown} className={styles.icon} />
                    </div>
                </div>
                <button className={styles.btnRetour} onClick={() => window.location.href = '/Accueil'}>Retour</button>
            </div>
        </>
    )
}

export default Explorer;