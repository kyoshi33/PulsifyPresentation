import styles from '../styles/Home.module.css';

function Home() {
  return (
    <div styles={styles.mainContainer}>
      <h1>Créer un compte</h1>
      <h2>Créer un compte pour visualier, gérer et partager vos projets</h2>
      <div style={styles.inputContainer}>
        <input>Sign in with Google</input>
        <input placeholder="Email"></input>
        <input placeholder="Nom d'utilisateur"></input>
        <input placeholder="Mot de passe"></input>
        <input placeholder="Confirmation mot de passe"></input>
      </div>
    </div>

  );
}

export default Home;
