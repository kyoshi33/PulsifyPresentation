import styles from "../styles/Accueil.module.css"
import { useEffect, useState } from 'react';
import Link from "next/link";

import Header from "../components/Header";
import ModelCard from "../components/ModelCard";
import { useSelector } from "react-redux";

let connected = false;

function Accueil() {





    const [newProject, setNewProject] = useState(false);
    const [newExistingProject, setNewExistingProject] = useState(false);
    const [search, setSearch] = useState('');
    const [searchCommunity, setSearchCommunity] = useState('');
    const [selectedTab, setSelectedTab] = useState(1);
    const [listProject, setListProject] = useState([]);
    const [listCommunityProject, setListCommunityProject] = useState([]);

    const user = useSelector((state => state.user.value));

    //Rechercher les prompts de l'utilisateur pendant qu'il remplit le champ de recherche
    const fetchProjects = async () => {
        // Fetch des projets 
        const fetchProject = await fetch('http://localhost:3000/projects/searchMyGenres', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search, email: user.email, token: user.token }),
        })
        const res = await fetchProject.json()
        res.result && setListProject(res.searchResults)
    }

    //Rechercher les prompts de la communauté liké par l'utilisateur pendant qu'il remplit le champ de recherche
    const fetchCommunityProjects = async () => {
        // Fetch des projets 
        const fetchProject = await fetch('http://localhost:3000/projects/searchCommunityGenres', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search: searchCommunity, email: user.email, token: user.token }),
        })
        const res = await fetchProject.json()
        res.result && setListCommunityProject(res.searchResults)
    }



    useEffect(() => {
        fetchProjects();
    }, [search]);

    useEffect(() => {
        fetchCommunityProjects();
    }, [searchCommunity])



    let display =
        <div className={styles.container}>
            <div className={styles.choiceContainer}>
                <button className={styles.createBtn} onClick={() => setNewProject(true)}>Nouveau projet</button>
            </div>
            <Link href='Explorer'>
                <button className={styles.exploreBtn}>Explorer</button>
            </Link>
        </div>

    if (newProject) {
        display =
            <>
                <div className={styles.selectModelContainer}>
                    <div className={styles.choiceContainer}>
                        <button className={styles.createBtn} onClick={() => setNewExistingProject(true)}>Utiliser un genre</button>
                        <Link href='/Project'>
                            <button className={styles.createBtn}>Démarrer un projet vierge</button>
                        </Link>
                    </div>
                    <Link href='Explorer'>
                        <button className={styles.exploreBtn}>Explorer</button>
                    </Link>
                </div>
            </>
    }


    if (newExistingProject) {


        let mappedProjects;
        if (selectedTab === 1) {
            const myProjects = listProject;
            if (listProject.length && search.length) {
                mappedProjects = listProject.map((project, i) => {
                    let { prompt, genre, titre } = project;
                    return <div className={styles.modelCard}>
                        <ModelCard genre={genre}
                            prompt={prompt}
                            title={titre}
                        />
                    </div>
                });
            } else {
                mappedProjects = myProjects.map((project, i) => {
                    let { prompt, genre, titre } = project;
                    return <div className={styles.modelCard}>
                        <ModelCard genre={genre}
                            prompt={prompt}
                            title={titre}
                        />
                    </div>
                });
            }
        } else if (selectedTab === 2) {
            const myProjects = listCommunityProject;
            if (listProject.length && search.length) {
                mappedProjects = listCommunityProject.map((project, i) => {
                    let { prompt, genre, titre } = project;
                    return <div className={styles.modelCard}>
                        <ModelCard genre={genre}
                            prompt={prompt}
                            title={titre}
                        />
                    </div>
                });
            } else {
                mappedProjects = myProjects.map((project, i) => {
                    let { prompt, genre, titre } = project;
                    return <div className={styles.modelCard}>
                        <ModelCard genre={genre}
                            prompt={prompt}
                            title={titre}
                        />
                    </div>
                });
            }
        }

        display =
            <div className={styles.container} >
                <div className={styles.title}>Sélectionnez un genre enregistré</div>
                <div className={styles.selectModelContainer}>
                    <div className={styles.tabBar}>
                        <div className={selectedTab === 1 ? styles.selectedTab : styles.tab} onClick={() => {
                            setSearch('');
                            setSelectedTab(1)
                        }}>
                            Mes genres
                        </div>
                        <div className={selectedTab === 2 ? styles.selectedTab : styles.tab} onClick={() => {
                            setSearchCommunity('');
                            setSelectedTab(2)
                        }} >
                            Communauté
                        </div>
                    </div>
                    <div className={styles.modelChoiceContainer}>

                        <input type='string' placeholder='Recherche...' value={selectedTab === 1 ? search : searchCommunity} onChange={(e) => { selectedTab === 1 ? setSearch(e.target.value) : setSearchCommunity(e.target.value) }
                        } className={styles.inputSearch} />

                        <div className={styles.scrollWindow}>
                            {mappedProjects}
                        </div>
                    </div>
                </div>
                <button className={styles.exploreBtn} onClick={() => { setNewProject(false); setNewExistingProject(false) }}>Retour</button>
            </div >
    }



    return (
        <>
            <Header></Header>
            {display}
        </>
    )
}

export default Accueil;
