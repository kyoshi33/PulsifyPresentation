import styles from "../styles/SignUp.module.css"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';




function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [showRePassword, setShowRePassword] = useState(false)


    let passwordEye;
    let rePasswordEye
    if (showPassword) {
        passwordEye = <FontAwesomeIcon icon={faEye} onClick={() => setShowPassword(!showPassword)} className={styles.userSection} />;
    } else {
        passwordEye = <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowPassword(!showPassword)} className={styles.userSection} />;
    }

    if (showRePassword) {
        rePasswordEye = <FontAwesomeIcon icon={faEye} onClick={() => setShowRePassword(!showRePassword)} className={styles.userSection} />;
    } else {
        rePasswordEye = <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowRePassword(!showRePassword)} className={styles.userSection} />;
    }
    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.h1}>Créer un compte</h1>
            <h2 className={styles.h2}>Créer un compte pour visualier, gérer et partager vos projets</h2>
            <div className={styles.inputContainer}>
                <button className={styles.createBtn}>Se connecter avec google</button>
                ou ...
                <input className={styles.input} type="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Email invalide" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                <input className={styles.input} placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} value={username} required />
                <input className={styles.input} placeholder="Prénom" onChange={(e) => setName(e.target.value)} value={name} required />

                <div className={styles.inputDiv}>
                    <input className={styles.input} type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    {passwordEye}
                </div>
                <div className={styles.inputDiv}>
                    <input className={styles.input} type={showRePassword ? "text" : "password"}

                        placeholder="Confirmation mot de passe" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword} required />
                    {rePasswordEye}
                </div>

                <h3 className={styles.h3}> En créant un compte, vous acceptez les conditions d'utilisation et la politique de confidentialité </h3>
                <button className={styles.createBtn}>Créer un compte</button>
            </div>
        </div >
    )
}

export default SignUp;
