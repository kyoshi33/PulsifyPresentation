import styles from "../styles/Help.module.css"
import Link from "next/link";
import { useRouter } from "next/router";

function Help() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <body className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Aide</h1>
                <div>[Video]</div>
                <div>
                    <p className={styles.text}>1. Ouvrez Suno AI: <Link href={'https://suno.com/'}><span className={styles.link} >Cliquez ici</span></Link></p>
                    <p className={styles.text}>2. Cliquez sur "Create"</p>
                    <p className={styles.text}>3. Cliquez sur "Custom"</p>
                    <p className={styles.text}>4. Renseignez votre prompt dans le champ "Styles of music"</p>
                    <p className={styles.text}>5. Générez un nouveau morceau de Suno en cliquant "Create"</p>
                    <p className={styles.text}>6. Ecoutez et attribuez une note au résultat sur Pulsify</p>
                </div>
            </div>
            <button className={styles.btn} onClick={handleBack}>Retour</button>

        </body>
    )
}

export default Help;
