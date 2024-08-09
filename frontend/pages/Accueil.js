import styles from "../styles/Accueil.module.css"
import { useEffect, useState } from 'react';
import Link from "next/link";

import Header from "../components/Header";
import ModelCard from "../components/ModelCard";
import { useSelector } from "react-redux";

let connected = false;

function Accueil() {



    const fetchedProjects = [
        {
            "titre": "Titre",
            "_id": {
                "$oid": "66b494914e7495cb2dc817c1"
            },
            "prompt": "Psytrance, Ethereal Melodies, Driving Basslines, Cosmic Synths, Progressive Build-ups, Hypnotic Beats, Mystical Vocals",
            "userId": {
                "$oid": "66b2666d4c79a02b2fedee4c"
            },
            "keywords": [
                {
                    "$oid": "66b494614e7495cb2dc8179d"
                },
                {
                    "$oid": "66b494614e7495cb2dc817a0"
                },
                {
                    "$oid": "66b494614e7495cb2dc817a3"
                },
                {
                    "$oid": "66b494624e7495cb2dc817a6"
                },
                {
                    "$oid": "66b494624e7495cb2dc817a9"
                },
                {
                    "$oid": "66b494624e7495cb2dc817ac"
                },
                {
                    "$oid": "66b494624e7495cb2dc817af"
                }
            ],
            "genre": "Astrox Chocolate",
            "messages": [],
            "audio": null,
            "rating": 2,
            "isPublic": false,
            "date": {
                "$date": "2024-08-08T09:49:05.838Z"
            },
            "__v": 0
        },
        {
            "titre": "Titre",
            "_id": {
                "$oid": "66b494914e7495cb2dc817c1"
            },
            "prompt": "Psytrance, Ethereal Melodies, Driving Basslines, Cosmic Synths, Progressive Build-ups, Hypnotic Beats, Mystical Vocals",
            "userId": {
                "$oid": "66b2666d4c79a02b2fedee4c"
            },
            "keywords": [
                {
                    "$oid": "66b494614e7495cb2dc8179d"
                },
                {
                    "$oid": "66b494614e7495cb2dc817a0"
                },
                {
                    "$oid": "66b494614e7495cb2dc817a3"
                },
                {
                    "$oid": "66b494624e7495cb2dc817a6"
                },
                {
                    "$oid": "66b494624e7495cb2dc817a9"
                },
                {
                    "$oid": "66b494624e7495cb2dc817ac"
                },
                {
                    "$oid": "66b494624e7495cb2dc817af"
                }
            ],
            "genre": "Astrox",
            "messages": [],
            "audio": null,
            "rating": 2,
            "isPublic": false,
            "date": {
                "$date": "2024-08-08T09:49:05.838Z"
            },
            "__v": 0
        }
    ]


    const [newProject, setNewProject] = useState(false);
    const [newExistingProject, setNewExistingProject] = useState(false);
    const [search, setSearch] = useState('');
    const [searchCommunity, setSearchCommunity] = useState('');
    const [selectedTab, setSelectedTab] = useState(1);
    const [listProject, setListProject] = useState([]);

    const user = useSelector((state => state.user.value));

    //Rechercher les prompts de l'utilisateur pendant qu'il remplit le champ de recherche
    useEffect(() => {
        const fetchProject = async () => {
            // fetch des projets 
            const fetchProject = await fetch('http://localhost:3000/projects/searchMyProjects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ search, email: user.email, token: user.token }),
            })
            const res = await fetchProject.json()
            res.result && setListProject(res.searchResults)
        }
        fetchProject();
    }, [search]);

    //Rechercher les prompts de la communauté liké par l'utilisateur pendant qu'il remplit le champ de recherche
    useEffect(() => {
        const fetchProject = async () => {
            // fetch des projets 
            const fetchProject = await fetch('http://localhost:3000/projects/searchCommunityProjects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchCommunity, email: user.email, token: user.token }),
            })
            const res = await fetchProject.json()
            res.result && setListProject(res.searchResults)
        }
        fetchProject();
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
            const myProjects = fetchedProjects;
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
            const myProjects = fetchedProjects;
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
        }

        display =
            <div className={styles.container} >
                <div className={styles.title}>Sélectionnez un genre enregistré</div>
                <div className={styles.selectModelContainer}>
                    <div className={styles.tabBar}>
                        <div className={selectedTab === 1 ? styles.selectedTab : styles.tab} onClick={() => setSelectedTab(1)}>
                            Mes genres
                        </div>
                        <div className={selectedTab === 2 ? styles.selectedTab : styles.tab} onClick={() => setSelectedTab(2)} >
                            Communauté
                        </div>
                    </div>
                    <div className={styles.modelChoiceContainer}>

                        <input type='string' placeholder='Recherche...' onChange={(e) => { setSearch(e.target.value) }
                        } value={search} className={styles.inputSearch} />

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
