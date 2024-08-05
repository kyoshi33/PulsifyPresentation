import styles from '../styles/Login.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { login, logout } from '../reducers/user';

function Login() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(false)

  let error;
  if (errorLogin) { error = <h4 style={{ color: 'red' }}>Champs manquants ou invalides</h4> }

  let googleBtn = <GoogleLogin
    onSuccess={(credentialResponse) => {
      let email = jwtDecode(credentialResponse.credential).email
      connexionGoogle(email)
    }}
    onError={() => {
      setErrorLogin(true)
    }}
  />

  const connexionGoogle = async (emailGoogle) => {
    const fetchLogin = await fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailGoogle }),
    })
    const res = await fetchLogin.json()
    if (res.result) {

    } else {
      setErrorLogin(true)
    }
  }

  const connexion = async () => {
    const fetchLogin = await fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    })
    const res = await fetchLogin.json()
    if (res.result) {
      setEmail('')
      setPassword('')
    } else {
      setErrorLogin(true)
    }
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className={styles.container}>
        <h1 className={styles.title}>Connexion</h1>
        {googleBtn}
        <h2>ou ...</h2>
        <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} className={styles.inputEmail} />
        <input type='password' placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} value={password} className={styles.inputPassword} />
        {error}
        <h4>Mot de passe oublié ?</h4>
        <button className={styles.btn} onClick={() => connexion()}>Connexion</button>
        <button className={styles.btnRetour} onClick={() => window.location.href = '/'}>Retour</button>
      </div>
    </GoogleOAuthProvider>
  )
}

export default Login;