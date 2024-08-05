import styles from '../styles/Welcome.module.css';
import { useState } from 'react'

function Welcome() {
  const [tutoPage, setTutoPage] = useState(0)

  const handleNext = () => {
    if (tutoPage < 3) {
      setTutoPage(tutoPage + 1)
    }
  }

  const handlePrev = () => {
    if (tutoPage > 0) {
      setTutoPage(tutoPage - 1)
    }
  }

  let tutoContent;

  if (tutoPage === 0) {
    let style = {}
    tutoContent = (
      <div className={styles.tutoContainer}>
        <div className={styles.tutoTextContainer}>
          <h3 className={styles.tutoTitle}>Bienvenue chez Pulsify !</h3>
          <p className={styles.tutoText}>Votre allié Suno ultime pour générer les invites (prompt) dont vous rêvez !</p>

        </div>
        <footer className={styles.tutoFooter}>

          <div className={styles.tutoCarousel}>Tuto Page 1 of 4</div>
          <button className={styles.btn} onClick={handleNext}>Suivant</button>
        </footer>
      </div>
    );
  } else if (tutoPage === 1) {
    tutoContent =
      <div className={styles.tutoContainer}>
        <div className={styles.tutoTextContainer}>

          <p className={styles.tutoText}>Suno est une startup spécialisée dans la création de musique assistée par intelligence artificielle. Leur technologie permet aux utilisateurs de générer des morceaux de musique à partir de simples descriptions textuelles. La génération de ces morceaux de musique coûtent des crédits.</p>
        </div>
        <footer className={styles.tutoFooter}>
          <button className={styles.btn} onClick={handlePrev}>Précédent</button>
          <div className={styles.tutoCarousel}>Tuto Page 2 of 4</div>
          <button className={styles.btn} onClick={handleNext}>Suivant</button>
        </footer>
      </div>
  } else if (tutoPage === 2) {
    tutoContent = (
      <div className={styles.tutoContainer}>
        <div className={styles.tutoTextContainer}>
          <h3 className={styles.tutoTitleText}>Economisez vos crédits grâce à des invites de plus en plus pertinentes !</h3>
          <p className={styles.tutoText}>Choisissez des styles musicaux qui correspondent à ce que vous souhaitez générer et ajustez au fur et à mesure</p>
          <div >Sans Pulsify, 200 essais. Avec Pulsify, 20 essais</div>
        </div>
        <footer className={styles.tutoFooter}>
          <button className={styles.btn} onClick={handlePrev}>Précédent</button>
          <div className={styles.tutoCarousel}>Tuto Page 3 of 4</div>
          <button className={styles.btn} onClick={handleNext}>Suivant</button>
        </footer>
      </div>
    )
  } else if (tutoPage === 3) {
    tutoContent = (
      <div className={styles.tutoContainer}>
        <div className={styles.tutoTextContainer}>
          <h3 className={styles.tutoText}>Rappelez-vous des sons générés précédement, et ajustez la note si votre avis a changé</h3>
          <p className={styles.tutoText}>Mémorisez les styles musicaux et trouvez les mots-clés qui vont bien ensemble</p>

        </div>
        <footer className={styles.tutoFooter}>
          <button className={styles.btn} onClick={handlePrev}>Précédent</button>
          <div className={styles.tutoCarousel}>Tuto Page 4 of 4</div>

        </footer>
      </div>

    )
  }








  return (
    <div>
      <main className={styles.main}>
        <header className={styles.handleConnectionContainer}>
          <h1 className={styles.title1}>PULSIFY</h1>
          <div className={styles.btnContainer}>

            <button className={styles.btn}>Inscription</button>
            <button className={styles.btn}>Connexion</button>
          </div>
        </header>
        <div>
          {tutoContent}
        </div>
      </main>
    </div>
  );
}

export default Welcome;
