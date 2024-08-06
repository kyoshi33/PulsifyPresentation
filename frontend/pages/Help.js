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
            <h1 className={styles.title}>Aide</h1>
            <div>Video</div>
            <div>
                <p>1. Ouvrez Suno AI: <Link href={'https://suno.com/'}>https://suno.com/</Link></p>
                <p>2. Cliquez sur "Create"</p>
                <p>3. Cliquez sur "Custom"</p>
                <p>4. Renseignez votre prompt dans le champs "Styles of music"</p>
                <p>5. Générez un nouveau morceau de Suno en cliquant "Create"</p>
                <p>6. Ecoutez et attribué une note au résultat pulsify</p>
            </div>
            <button className={styles.btn} onClick={handleBack}>Retour</button>

        </body>
    )
}

export default Help;
