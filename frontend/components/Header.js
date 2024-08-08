import styles from '../styles/Header.module.css';
import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Image from 'next/image'



function Header() {
    const user = useSelector((state) => state.user.value)

    let topMenu =
        <div className={styles.btnContainer}>
            <Link href='/SignUp'>
                <button className={styles.btn}>Inscription</button>
            </Link>
            <Link href='/Login'>
                <button className={styles.btn}>Connexion</button>
            </Link>
        </div>

    if (user.token) {
        topMenu =
            <div className={styles.btnContainer}>
                <Link href='/Profil'>
                    <div className={styles.roundBtn}>
                        {user.picture ? <image src={"https://lh3.googleusercontent.com/a/ACg8ocLAEWeb_1yvO9Pvo79NErykvYrfAs8XfzWbvvs6gMinZ0jjEoJi=s96-c"} width={500} height={500} alt="Picture of the author" /> : <FontAwesomeIcon icon={faUser} className={styles.icon} />}

                    </div>
                </Link>
                <Link href='/Help'>
                    <div className={styles.roundBtn}>
                        <FontAwesomeIcon icon={faQuestion} className={styles.icon} />
                    </div>
                </Link>
            </div>
    }


    return (
        <header className={styles.handleConnectionContainer}>
            <Link href='/Accueil'>
                <h1 className={styles.title1}>PULSIFY</h1>
            </Link>
            {topMenu}
        </header>
    );
}

export default Header;
