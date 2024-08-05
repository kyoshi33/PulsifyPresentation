import styles from "../styles/Accueil.module.css"
import { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import Header from "../components/Header";



function Accueil() {


    return (
        <>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <button className={styles.createBtn}>Nouveau projet</button>
                </div>
            </div>
        </>
    )
}

export default Accueil;
