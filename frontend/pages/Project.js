import styles from '../styles/Project.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectModal from '../components/ProjectModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSearch, faCopy } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";

import Header from '../components/Header';

function Project() {
    const [projectTitle, setProjectTitle] = useState("");
    const [prompt, setPrompt] = useState("")
    const [search, setSearch] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [suggestionsList, setSuggestionsList] = useState(["Rock", "Pop", "Guitar", "Bass", "Drums"])
    const router = useRouter();



    let suggestion = suggestionsList.map((data, i) => {
        return (
            <div className={styles.suggestionItem}>
                <div className={styles.suggestionItemLeft}>
                    <div key={i} >{data}</div>
                </div>
                <div className={styles.suggestionItemRight}>10%</div>
            </div>
        )
    }
    )

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
                <div className={styles.leftContainer}>
                    <div className={styles.suggestionContainer}>
                        <div className={styles.suggestionTitle}>Suggestions</div>
                        <div className={styles.suggestionList}>
                            {suggestion}
                        </div>
                        <div className={styles.bottomSuggestionList}>
                            <div>Intégrez les favoris de la communauté</div>
                            <input className={styles.checkBoxSuggestion} type="checkbox" />
                        </div>
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
                    <div className={styles.inputPromptContainer}>
                        <textarea className={styles.inputProjectPrompt}
                            placeholder='Entrez votre prompt ici'
                            onChange={(e) => setPrompt(e.target.value)}
                            value={prompt} />
                        <div className={styles.promptBottom}>
                            <div className={styles.totalCharacters}>{`${prompt.length} / 120`}</div>
                            <FontAwesomeIcon
                                icon={faCopy}
                                className={styles.copyPasteIcon}
                            />
                        </div>

                    </div>
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