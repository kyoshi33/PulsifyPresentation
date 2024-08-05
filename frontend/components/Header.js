import styles from '../styles/Header.module.css';
import { useState } from 'react'
import Link from 'next/link'

function Header() {


    return (
        <header className={styles.handleConnectionContainer}>
            <h1 className={styles.title1}>PULSIFY</h1>
            <div className={styles.btnContainer}>
                <Link href='/SignUp'>
                    <button className={styles.btn}>Inscription</button>
                </Link>
                <Link href='/login'>
                    <button className={styles.btn}>Connexion</button>
                </Link>
            </div>
        </header>
    );
}

export default Header;
