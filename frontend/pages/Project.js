import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCopy, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";

import styles from '../styles/Project.module.css'
import ProjectModal from '../components/ProjectModal';
import GenresModal from '../components/GenresModal';
import Header from '../components/Header';

function Project() {
    const user = useSelector((state) => state.user.value)
    const [projectTitle, setProjectTitle] = useState("");
    const [prompt, setPrompt] = useState("")
    const [search, setSearch] = useState("");
    const [genresModalIsOpen, setGenresModalIsOpen] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [suggestionsList, setSuggestionsList] = useState([]);
    const [isCopied, setIsCopied] = useState(false);
    const [projectGenre, setProjectGenre] = useState('');
    const [titleIsInvalid, setTitleIsInvalid] = useState(false);
    const [genreIsInvalid, setGenreIsInvalid] = useState(false);
    const [promptIsInvalid, setPromptIsInvalid] = useState(false);
    const [blink, setBlink] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [spotifyNoResult, setSpotifyNoResult] = useState(false);

    const router = useRouter();

    let genres = [];

    useEffect(() => {
        if (router.query.genre) {
            const incomingGenre = router.query.genre
            setProjectGenre(incomingGenre)
        }
    }, [])


    // Fetch des suggestions
    const suggestions = [];
    const fetchSuggestions = async () => {
        const { token, email } = user;
        const fetchSuggestions = await fetch('http://localhost:3000/keywords/suggestions',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token, genre: projectGenre, partialPrompt: prompt }),
            })

        const resSuggestions = await fetchSuggestions.json();

        setTotalScore(resSuggestions.totalScore);
        suggestions = resSuggestions.suggestionsList;

        suggestions && setSuggestionsList([...suggestions])
    };

    // Rechercher des suggestions à chaque fois que l'utilisateur entre un caractère dans l'imput de prompt
    useEffect(() => {
        fetchSuggestions();
    }, [prompt])

    // Fonction qui permet de sélectionner le genre depuis la modale
    const handleGenreSelect = (selectedGenre) => {
        setProjectGenre(selectedGenre);
        closeGenresModal();
    };

    // Map des suggestions
    let suggestion = [];
    console.log(suggestionsList)
    if (suggestionsList.length != 0) {
        suggestion = suggestionsList.map((data, i) => {
            const pourcentage = (data.score_global / totalScore).toPrecision(4) * 100
            return (
                <div className={styles.suggestionItem} onClick={() => addGenreFromSearchBar(data)}>
                    <div className={styles.suggestionItemLeft}>
                        <div key={i} >{data.keyword}</div>
                    </div>
                    <div className={styles.suggestionItemRight}>{pourcentage}%</div>
                </div>
            )
        }
        );
    }

    // Fonction de copier / coller du prompt
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(prompt).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };


    // Retourner sur la page précédente lors du clic sur "Retour"
    const handleBack = () => {
        router.back();
    };


    // Appeler la route de recherche sur Spotify
    const fetchGenreArtistOnSpotify = async (search) => {
        const { token, email } = user;
        const fetchArtist = await fetch('http://localhost:3000/spotify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search, token, email }),
        });
        const res = await fetchArtist.json();
        setSearchResults(res)
        if (!res.length) {
            genres = <div className={styles.searchTitle}>Pas d'artistes trouvés à ce nom</div>
            setSpotifyNoResult(true);
        } else { setSpotifyNoResult(false); }
    }

    // Rechercher sur Spotify lorsque l'utilisateur appuie sur Entrée
    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchGenreArtistOnSpotify(search);
        }
    }

    // Mapper les genres d'un artiste
    spotifyNoResult ? (genres = search ? <div className={styles.searchTitle}>Pas d'artistes trouvés à ce nom</div> : <div className={styles.searchTitle}>Entrez d'abord un artiste</div>) :
        searchResults.length &&
        (genres = searchResults.map((data, i) => (
            <div key={i} className={styles.genreItem} onClick={() => addGenreFromSearchBar(data)}>
                <div>{data}</div>
            </div>
        )))

    const triggerBlink = () => {
        setBlink(true);
        setTimeout(() => {
            setBlink(false);
        }, 200); // Change la bordure en noir après 200ms

        setTimeout(() => {
            setBlink(true);
        }, 400); // Réapplique la bordure rouge après 400ms

        setTimeout(() => {
            setBlink(false);
        }, 800); // Finalise en réappliquant la bordure noire après 800ms
    }


    // Ouvrir et fermer la modale de genres
    const openGenresModal = () => {
        setGenresModalIsOpen(true)
    }
    const closeGenresModal = () => {
        setGenresModalIsOpen(false)
    }

    // Ouvrir la modale de projet au clic sur "Enregistrer"
    const openProjectModal = () => {
        if (prompt.length === 0 || projectTitle.length === 0 || projectGenre.length === 0) {
            if (prompt.length === 0) {
                setPromptIsInvalid(true);
            } else {
                setPromptIsInvalid(false);
            }
            if (projectTitle.length === 0) {
                setTitleIsInvalid(true);
            } else {
                setTitleIsInvalid(false);
            }
            if (projectGenre.length === 0) {
                setGenreIsInvalid(true);
            } else {
                setGenreIsInvalid(false);
            }
            triggerBlink();
            setTimeout(() => {
                alert('Renseignez un titre, un genre et un prompt pour votre projet.')
            }, 1000)
        } else {
            setGenreIsInvalid(false);
            setPromptIsInvalid(false);
            setTitleIsInvalid(false);
            setIsOpen(true)
        }
    }

    const closeProjectModal = () => {
        setIsOpen(false);
    }

    // Ajouter un genre depuis la recherche par artiste
    const addGenreFromSearchBar = (genre) => {
        if (prompt.length === 0) {
            setPrompt(`${genre}, `)
        } else if ((prompt.length + genre.length) < 120) {
            setPrompt(prompt + `${genre}, `)
        }
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
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" className={styles.checkBoxSuggestion} />
                                <span className={styles.customCheckbox}></span>
                                Intégrez les favoris de la communauté
                            </label>
                        </div>
                    </div>
                    <button className={styles.btn} onClick={handleBack}>Retour</button>
                </div>
                <div className={styles.projectContainer}>
                    <div className={styles.projectHeader}>
                        <div className={styles.leftPartHeader}>
                            <div className={styles.textHeader}>Titre de votre projet</div>
                            <input className={styles.inputProjectTitle}
                                placeholder='Nom du projet'
                                onChange={(e) => setProjectTitle(e.target.value)}
                                style={{
                                    border: titleIsInvalid && blink && '2px solid red',
                                    padding: '10px',
                                    outline: 'none',
                                }}
                                value={projectTitle}
                                maxLength={25}
                            ></input>
                        </div>
                        <div className={styles.rightPartHeader}>
                            <div className={styles.textHeader}>Genre de votre projet</div>
                            <div className={styles.genreProject}>
                                <input className={styles.inputGenreProject}
                                    placeholder='Genre du projet'
                                    onChange={(e) => setProjectGenre(e.target.value)}
                                    style={{
                                        border: genreIsInvalid && blink && '2px solid red',
                                        padding: '10px',
                                        outline: 'none',
                                    }}
                                    value={projectGenre}
                                    maxLength={25}>
                                </input>
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className={styles.searchGenreBtn}
                                    onClick={openGenresModal}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.inputPromptContainer}>
                        <textarea className={styles.inputProjectPrompt}
                            placeholder='Entrez votre prompt ici'
                            onChange={(e) => setPrompt(e.target.value)}
                            style={{
                                border: promptIsInvalid && blink && '2px solid red',
                                padding: '10px',
                                outline: 'none',
                            }}
                            value={prompt}
                            maxLength={120}
                            onKeyPress={e => {
                                if (e.key === 'Enter')
                                    e.preventDefault()
                            }} />
                        <div className={styles.promptBottom}>
                            <div className={styles.totalCharacters}>{`${prompt.length} / 120`}</div>
                            {isCopied ? (
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className={styles.copyPasteIcon}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faCopy}
                                    className={styles.copyPasteIcon}
                                    onClick={handleCopyToClipboard} // Use the new copy handler
                                />
                            )}
                        </div>

                    </div>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchTitle}>Recherche de genre par artiste</div>
                        <div className={styles.searchInputContainer}>
                            <input className={styles.searchInput}
                                placeholder='Recherchez vos artistes préférés'
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                onKeyDown={handleSearchKeyDown}></input>
                            <FontAwesomeIcon icon={faSearch}
                                className={styles.searchBtn}
                                onClick={() => fetchGenreArtistOnSpotify(search)} />
                        </div>
                        <div className={styles.genresList} >
                            {genres}
                        </div>
                    </div>
                    <button className={styles.btn}
                        onClick={() => openProjectModal()}
                    >Enregistrer</button>
                    <ProjectModal isOpen={modalIsOpen}
                        onRequestClose={closeProjectModal}
                        projectTitle={projectTitle}
                        prompt={prompt}
                        projectGenre={projectGenre}
                    />
                    <GenresModal isOpen={genresModalIsOpen}
                        onRequestClose={closeGenresModal}
                        projectGenre={projectGenre}
                        handleGenreSelect={handleGenreSelect} // Pass handler to modal
                    />
                </div>
            </div>
        </div>

    )
}

export default Project;