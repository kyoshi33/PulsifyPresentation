import styles from '../styles/Project.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectModal from '../components/ProjectModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/Header';

function Project() {
    const [projectTitle, setProjectTitle] = useState("");
    const [search, setSearch] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);

    const openProjectModal = () => {
        setIsOpen(true)
    }

    const closeProjectModal = () => {
        setIsOpen(false);
    }

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
                        <div className={styles.colorTheme}>
                            <FontAwesomeIcon
                                icon={faCircle}
                                className={styles.colorThemeIcon}
                            />
                            <FontAwesomeIcon
                                icon={faCircle}
                                className={styles.colorThemeIcon}
                            />
                            <FontAwesomeIcon
                                icon={faCircle}
                                className={styles.colorThemeIcon}
                            />
                            <FontAwesomeIcon
                                icon={faCircle}
                                className={styles.colorThemeIcon}
                            />
                        </div>
                    </div>
                    <textarea className={styles.inputProjectPrompt}
                        placeholder='Entrez votre prompt ici'
                        onChange={(e) => setProjectTitle(e.target.value)}
                        value={projectTitle}></textarea>
                    <div className={styles.totalCharacters}>{`${projectTitle.length} / 120`}</div>
                    <div className={styles.searchContainer}>
                        <p className={styles.searchTitle}>Recherche de genre par artiste</p>
                        <input className={styles.searchInput}
                            placeholder='Enter an artist here'
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}></input>

                    </div>
                    <button className={styles.btn}
                        onClick={() => openProjectModal()}
                    >Enregistrer</button>
                    <ProjectModal isOpen={modalIsOpen}
                        onRequestClose={closeProjectModal}
                    />
                </div>
            </body>
        </div>
    )
}

export default Project;