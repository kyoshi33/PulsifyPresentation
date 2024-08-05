import styles from '../styles/Project.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';

function Project() {

    return (
        <div className={styles.main}>
            <Header></Header>
            <body className={styles.projectBody}>
                <div className={styles.suggestionContainer}>
                    <div className={styles.suggestionList}>
                        <h3 className={styles.suggestionTitle}>Suggestions</h3>
                        <div>suggestion 1</div>
                        <div>Suggestion 2</div>
                    </div>
                    <button className={styles.btn}>Retour</button>
                </div>
                <div className={styles.projectContainer}>
                    <div className={styles.projectHeader}>
                        <input className={styles.inputProjectTitle} placeholder='Le nom de votre projet'></input>
                        <div className={styles.colorTheme}>Color Theme</div>
                    </div>
                    <input className={styles.inputProjectPrompt} placeholder='Entrez votre prompt ici'></input>
                    <div className={styles.searchContainer}>
                        <p className={styles.searchTitle}>Recherche de genre par artiste</p>
                        <input className={styles.searchInput} placeholder='Enter an artist here'></input>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default Project;