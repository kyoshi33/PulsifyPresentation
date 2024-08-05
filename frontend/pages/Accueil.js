import styles from "../styles/Accueil.module.css"
import { useEffect, useState } from 'react';


import Header from "../components/Header";

let connected = false;

function Accueil() {

    const [newProject, setNewProject] = useState(false);
    const [newExistingProject, setNewExistingProject] = useState(false);

    let display =
        <div className={styles.container}>
            <div className={styles.choiceContainer}>
                <button className={styles.createBtn} onClick={() => setNewProject(true)}>Nouveau projet</button>
            </div>
        </div>

    if (newProject) {
        display =
            <>
                <div className={styles.selectModelContainer}>
                    <div className={styles.choiceContainer}>
                        <button className={styles.createBtn} onClick={() => setNewExistingProject(true)}>Utiliser un modèle existant</button>
                        <button className={styles.createBtn}>Démarrer un projet vierge</button>
                    </div>
                </div>
            </>
    }



    if (newExistingProject) {
        display =
            <>
                <div className={styles.title}>Sélectionnez un modèle enregistré</div>
                <div className={styles.selectModelContainer}>
                    <div className={styles.choiceContainer}>
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
