import styles from '../styles/Header.module.css';
import { useState } from 'react'

function Header() {


    return (
        <header className={styles.handleConnectionContainer}>
            <h1 className={styles.title1}>PULSIFY</h1>
            <div className={styles.btnContainer}>

                <button className={styles.btn}>Inscription</button>
                <button className={styles.btn}>Connexion</button>
            </div>
        </header>
    );
}

export default Header;
