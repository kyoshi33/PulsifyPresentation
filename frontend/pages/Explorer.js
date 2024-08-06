import styles from "../styles/Explorer.module.css"
import Header from "../components/Header";
import PromptCard from '../components/PromptCard';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { Popover } from 'react-tiny-popover'

function Explorer() {
    const [search, setSearch] = useState('')
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [checkedAutor, setCheckedAutor] = useState(false);
    const [checkedKeyword, setCheckedKeyword] = useState(true);
    const [checkedProject, setCheckedProject] = useState(false);
    const [sortUp, setSortUp] = useState(false);
    const [sortDown, setSortDown] = useState(false);
    const [errorSearch, setErrorSearch] = useState(false);
    const [listProject, setListProject] = useState([]);

    if (!checkedAutor && !checkedKeyword && !checkedProject) {
        setCheckedKeyword(true)
    }

    const handleChange = (props) => {
        if (props === 'Autor') { setCheckedAutor(!checkedAutor); setCheckedKeyword(false); setCheckedProject(false) }
        if (props === 'Keyword') { setCheckedKeyword(!checkedKeyword); setCheckedAutor(false); setCheckedProject(false) }
        if (props === 'Project') { setCheckedProject(!checkedProject); setCheckedAutor(false); setCheckedKeyword(false) }
    }

    let colorFilter
    if (isPopoverOpen) {
        colorFilter = '#504E6B'
    }

    let colorUp
    if (sortUp) {
        colorUp = '#504E6B'
    }

    let colorDown
    if (sortDown) {
        colorDown = '#504E6B'
    }

    const fetchSearch = () => {
        if (checkedAutor) {
            fetchAutor()
            return
        }
        if (checkedProject) {
            fetchProject()
            return
        }
        if (checkedKeyword) {
            fetchKeyword()
            return
        }
    }

    const fetchAutor = async () => {
        // fetch des auteurs 
        /* const fetch = await fetch('http://localhost:3000/', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ autor: search }),
         })
         const res = await fetch.json()
         if (res.result) {
             setListProject(res.list)
             setErrorSearch(false)
         } else {
             setErrorSearch(true)
         }*/
    }
    const fetchKeyword = async () => {
        // fetch des mots clés
        /* const fetch = await fetch('http://localhost:3000/', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ keyword: search }),
         })
         const res = await fetch.json()
         if (res.result) {
             setListProject(res.list)
             setErrorSearch(false)
         } else {
             setErrorSearch(true)
         }*/
    }
    const fetchProject = async () => {
        // fetch des projets 
        /* const fetch = await fetch('http://localhost:3000/', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ project: search }),
         })
         const res = await fetch.json()
         if (res.result) {
             setListProject(res.list)
             setErrorSearch(false)
         } else {
             setErrorSearch(true)
         }*/
    }


    let tableau = [
        { projectName: 'Rockability', stars: 4, prompt: 'Jazz, rock, musette, flute' },
        { projectName: 'Jazzy', stars: 3, prompt: 'Jazz, troubadour, techno, flute' },
        { projectName: 'Techno', stars: 2, prompt: 'Jazz, rock, musette, flute' },
        { projectName: 'HardStyle', stars: 1, prompt: 'Jazz, rock, musette, flute' },
        { projectName: 'Pop', stars: 5, prompt: 'Jazz, rock, musette, flute' },
        { projectName: 'GhibliStyle', stars: 2, prompt: 'Jazz, rock, musette, flute' },
        { projectName: 'IDK', stars: 4, prompt: 'Jazz, rock, musette, flute' },
        { projectName: 'MFMusic', stars: 3, prompt: 'Jazz, rock, musette, flute' },
        { projectName: 'GPluDiDé', stars: 1, prompt: 'Jazz, rock, musette, flute' }]

    let listProjectSearch = tableau.map((data, i) => { return <PromptCard key={i} projectName={data.projectName} stars={data.stars} prompt={data.prompt} /> }) //listProject.map((data, i) => { return <PromptCard /> })

    if (sortUp) {
        listProjectSearch = tableau.sort((a, b) => b.stars - a.stars).map((data, i) => { return <PromptCard key={i} projectName={data.projectName} stars={data.stars} prompt={data.prompt} /> }) //classé par + liké first
    }
    if (sortDown) {
        listProjectSearch = tableau.sort((a, b) => a.stars - b.stars).map((data, i) => { return <PromptCard key={i} projectName={data.projectName} stars={data.stars} prompt={data.prompt} /> }) //classé par - liké first
    }

    let error
    if (errorSearch) {
        error = <h4 style={{ color: 'red', fontWeight: 'normal', fontStyle: 'italic', display: 'flex', justifyContent: 'center' }}>Aucun résultat trouvé</h4>
    }

    return (
        <>
            <Header></Header>
            <div className={styles.container}>

                <h1 className={styles.title}>Explorer</h1>


                <div className={styles.containerSearch}>
                    <input type='string' placeholder='Recherche...' onChange={(e) => { setSearch(e.target.value), fetchSearch() }} value={search} className={styles.inputSearch} />
                    <div className={styles.containerIcon}>
                        <Popover
                            isOpen={isPopoverOpen}
                            positions={'bottom'}
                            align={'center'}
                            padding={12}
                            reposition={false}
                            onClickOutside={() => setIsPopoverOpen(false)}
                            content={
                                <div className={styles.popoverContainer}>
                                    <div className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            checked={checkedAutor}
                                            onChange={() => handleChange('Autor')}
                                            className={styles.checkbox}
                                        />
                                        Auteur
                                    </div>

                                    <div className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            checked={checkedKeyword}
                                            onChange={() => handleChange('Keyword')}
                                            className={styles.checkbox}
                                        />
                                        Mots clés
                                    </div>

                                    <div className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            checked={checkedProject}
                                            onChange={() => handleChange('Project')}
                                            className={styles.checkbox}
                                        />
                                        Nom du projet
                                    </div>
                                </div>
                            }
                        >
                            <FontAwesomeIcon icon={faFilter} className={styles.icon} onClick={() => setIsPopoverOpen(!isPopoverOpen)} color={colorFilter} />
                        </Popover>
                        <FontAwesomeIcon icon={faSortAmountUp} className={styles.icon} color={colorUp} onClick={() => { setSortUp(!sortUp), setSortDown(false) }} />
                        <FontAwesomeIcon icon={faSortAmountDown} className={styles.icon} color={colorDown} onClick={() => { setSortDown(!sortDown), setSortUp(false) }} />
                    </div>
                </div>

                <div className={styles.scrollWindow}>
                    {error}
                    {listProjectSearch}
                </div>
                <button className={styles.btnRetour} onClick={() => window.location.href = '/Accueil'}>Retour</button>
            </div>


        </>
    )
}

export default Explorer;
