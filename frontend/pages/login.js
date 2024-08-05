import styles from '../styles/Login.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userGoogleEmail, setUserGoogleEmail] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  let googleBtn = <GoogleLogin
    onSuccess={(credentialResponse) => {
      let email = jwtDecode(credentialResponse.credential).email
      setUserGoogleEmail(email)
      setIsConnected(true)
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />

  const connexion = () => {

  }

  return (
    <GoogleOAuthProvider clientId={process.env.ID_GOOGLE}>
      <div className={styles.container}>
        <h1 className={styles.title}>Connexion</h1>
        {googleBtn}
        <h2>ou ...</h2>
        <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} className={styles.inputEmail} />
        <input type='password' placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} value={password} className={styles.inputPassword} />
        <h4>Mot de passe oublié ?</h4>
        <button className={styles.btn} onClick={() => connexion()}>Connexion</button>
        <button className={styles.btnRetour}>Retour</button>
      </div>
    </GoogleOAuthProvider>
  )
}

export default Login;