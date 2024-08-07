import styles from '../styles/Project.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectModal from '../components/ProjectModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";

import Header from '../components/Header';

function Project() {
    const [projectTitle, setProjectTitle] = useState("");
    const [prompt, setPrompt] = useState("")
    const [search, setSearch] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const router = useRouter();

    // Go back to previous page clicking on "retour"
    const handleBack = () => {
        router.back();
    };

    const fetchGenreArtistOnSpotify = async (search) => {
        const fetchArtist = await fetch('http://localhost:3000/spotify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search: search }),
        });
        const res = await fetchArtist.json();
        setSearchResults(res)
    }
    console.log('searchResults :', searchResults)
    const genres = searchResults.map((data, i) => {
        console.log('data :', data);
        return (
            <div key={i} className={styles.genreItem}>
                <input type="checkbox" />
                <p>{data}</p>
            </div>
        );
    });
    console.log('genres :', genres)

    // Open project modal on click on "Enregistrer"
    const openProjectModal = () => {
        console.log('projectTitle :', projectTitle)
        setIsOpen(true)
    }

    const closeProjectModal = () => {
        setIsOpen(false);
    }

    return (
        <div className={styles.main}>
            <Header></Header>
            <div className={styles.projectBody}>
                <div className={styles.suggestionContainer}>
                    <div className={styles.suggestionList}>
                        <h3 className={styles.suggestionTitle}>Suggestions</h3>
                        <div>suggestion 1</div>
                        <div>Suggestion 2</div>
                    </div>
                    <button className={styles.btn} onClick={handleBack}>Retour</button>
                </div>
                <div className={styles.projectContainer}>
                    <div className={styles.projectHeader}>
                        <input className={styles.inputProjectTitle}
                            placeholder='Le nom de votre projet'
                            onChange={(e) => setProjectTitle(e.target.value)}
                            value={projectTitle} ></input>
                        <div className={styles.colorTheme}>
                            <FontAwesomeIcon
                                icon={faCircle}
                                className={styles.colorTheme1Icon}
                            />
                            <FontAwesomeIcon
                                icon={faCircle}
                                className={styles.colorTheme2Icon}
                            />
                            <FontAwesomeIcon
                                icon={faCircle}
                                className={styles.colorTheme3Icon}
                            />
                            <FontAwesomeIcon
                                icon={faCircle}
                                className={styles.colorTheme4Icon}
                            />
                        </div>
                    </div>
                    <textarea className={styles.inputProjectPrompt}
                        placeholder='Entrez votre prompt ici'
                        onChange={(e) => setPrompt(e.target.value)}
                        value={prompt}
                    />
                    <div className={styles.totalCharacters}>{`${prompt.length} / 120`}</div>
                    <div className={styles.searchContainer}>
                        <p className={styles.searchTitle}>Recherche de genre par artiste</p>
                        <div>
                            <input className={styles.searchInput}
                                placeholder='Enter an artist here'
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}></input>
                            <FontAwesomeIcon icon={faSearch}
                                className={styles.searchBtn}
                                onClick={() => fetchGenreArtistOnSpotify(search)} />
                        </div>
                        {genres}
                    </div>
                    <button className={styles.btn}
                        onClick={() => openProjectModal()}
                    >Enregistrer</button>
                    <ProjectModal isOpen={modalIsOpen}
                        onRequestClose={closeProjectModal}
                        projectTitle={projectTitle}
                        prompt={prompt}
                    />
                </div>
            </div>
        </div>
    )
}

export default Project;