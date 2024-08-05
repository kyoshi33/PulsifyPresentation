import styles from "../styles/SignUp.module.css"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";



function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [showRePassword, setShowRePassword] = useState(false)
    const [errorLogin, setErrorLogin] = useState(false);
    const [isIdentical, setIsIdentical] = useState(false)
    const [isValidEmail, setisValidEmail] = useState(false)
    const [isValidUsername, setIsValidUsername] = useState(false)
    const [isValidName, setIsValidName] = useState(false)

    const dispatch = useDispatch();



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

    const createAccount = async () => {
        const fetchSignin = await fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, username: username, firstname: name, password: password }),
        })
        const res = await fetchSignin.json()
        if (res.result) {
            dispatch(login({ token: res.token, username: res.username, firstname: res.firstname, email: res.email }));
            setEmail('')
            setUsername('')
            setName('')
            setPassword('')
            setconfirmPassword('')
            window.location.href = '/Accueil'
        } else {
            setErrorLogin(true)
        }
    }

    const passwordMessage = <span className={styles.messages}>Les deux mots de passe ne sont pas identifiques</span>
    const mailMessage = <span className={styles.messages}>Mail invalide</span>
    const usernameMessage = <span className={styles.messages}>Nom d'utilisateur invalide</span>
    const nameMessage = <span className={styles.messages}>Prénom invalide</span>
    const errorMessage = <span>Erreur server</span>

    const checkForm = () => {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (pattern.test(email) && email !== "") {
            setisValidEmail(true)
        } else {
            setisValidEmail(false)
        }

        if (password === confirmPassword && password != "" && confirmPassword != "") {
            setIsIdentical(true)
            createAccount()
        } else {
            setIsIdentical(false)
        }
        username === "" ? setIsValidUsername(false) : setIsValidUsername(true)
        name === "" ? setIsValidName(false) : setIsValidName(true)

    }

    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.h1}>Créer un compte</h1>
            <h2 className={styles.h2}>Créer un compte pour visualier, gérer et partager vos projets</h2>
            <div className={styles.inputContainer}>
                <button className={styles.createBtn}>Se connecter avec google</button>
                ou ...

                <input className={styles.input} type="email"
                    title="Email invalide" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                {isValidEmail && mailMessage}
                <input className={styles.input} placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} value={username} />
                {isValidUsername && usernameMessage}
                <input className={styles.input} placeholder="Prénom" onChange={(e) => setName(e.target.value)} value={name} />
                {isValidName && nameMessage}

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
                {isIdentical && passwordMessage}

                <h3 className={styles.h3}> En créant un compte, vous acceptez les conditions d'utilisation et la politique de confidentialité </h3>
                <button className={styles.createBtn} onClick={() => checkForm()}>Créer un compte</button>
                {errorLogin && errorMessage}
            </div >
        </div >
    )
}

export default SignUp;
