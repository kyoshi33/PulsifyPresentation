import styles from "../styles/Accueil.module.css"
import { useEffect, useState } from 'react';


import Header from "../components/Header";

let connected = false;

function Accueil() {

    const [clicked, setClicked] = useState(false)

    let display =
        <div className={styles.container}>
            <div className={styles.choiceContainer}>
                <button className={styles.createBtn} onClick={() => setClicked(true)}>Nouveau projet</button>
            </div>
        </div>

    if (clicked) {
        display =
            <>
                <div className={styles.selectModelContainer}>
                    <div className={styles.choiceContainer}>
                        <button className={styles.createBtn}>Utiliser un modèle existant</button>
                        <button className={styles.createBtn}>Démarrer un projet vierge</button>
                    </div>
                </div>
            </>
    }


    return (
        <>
            <Header></Header>
            {display}
        </>
    )
}

export default Accueil;
