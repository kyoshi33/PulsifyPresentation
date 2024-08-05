import styles from "../styles/SignUp.module.css"
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Password } from 'primereact/password';



function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");







    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.h1}>Créer un compte</h1>
            <h2 className={styles.h2}>Créer un compte pour visualier, gérer et partager vos projets</h2>
            <div className={styles.inputContainer}>
                <button className={styles.createBtn}>Se connecter avec google</button>
                ou ...
                <input className={styles.input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                <input className={styles.input} placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} value={username} required />
                <input className={styles.input} placeholder="Prénom" onChange={(e) => setName(e.target.value)} value={name} required />
                <input className={styles.input} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} value={password} required />
                <input className={styles.input} placeholder="Confirmation mot de passe" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword} required />
                <h3 className={styles.h3}> En créant un compte, vous acceptez les conditions d'utilisation et la politique de confidentialité </h3>
                <button className={styles.createBtn}>Créer un compte</button>
            </div>
        </div>
    )
}

export default SignUp;
