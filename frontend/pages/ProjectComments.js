import styles from '../styles/ProjectComments.module.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Header from '../components/Header';
import PromptCard from '../components/PromptCard';
import MessageCard from '../components/MessageCard'

function ProjectComments() {
    const user = useSelector((state) => state.user.value)
    const [commentsList, setCommentsList] = useState([])
    const [comment, setComment] = useState("")
    const [projectInfo, setProjectInfo] = useState({})
    const router = useRouter();
    const { id } = router.query; // Retrieve the project ID from the query parameters
    const [reload, setReload] = useState(false)

    !user.token && router.push({ pathname: '/' });
    // console.log('id :', id)

    //retour sur la page précédente lors de l'appui sur "Retour"
    const handleBack = () => {
        router.back();
    };

    //renvoie sur la page projet avec le modèle sélectionner
    const handleUse = () => {
        const { title, genre, prompt } = projectInfo;
        router.push({
            pathname: '/Project',
            query: { genre, title, prompt },
        });
    };

    //Appel la route qui enregistre le commentaire en sous document dans le projet
    const postComment = async () => {
        const { email, token } = user;
        const postCommentInBD = await fetch('http://localhost:3000/projects/comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, comment, email, token }),
        })
        const res = await postCommentInBD.json()
        console.log('res :', res)
        if (res.result) {
            console.log('comment :', comment)
            setCommentsList([...commentsList, res.newComment])
            fetchProjectData(id)
            setComment('')
        } else {
            console.log('Error:', res.message);
        }
    }

    //fetch tout les commentaires du projet en fonction de son Id
    useEffect(() => {
        if (id) {
            fetchProjectData(id)
            console.log('Project ID:', id);
        }
    }, [id]);


    //fonction qui appelle la route qui récupère les commentaires du projet
    const fetchProjectData = async (id) => {
        const { email, token } = user;
        const fetchData = await fetch(`http://localhost:3000/projects/ProjectById`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, email, token }),
        });
        const res = await fetchData.json()
        console.log('project info :', res.info.messages)
        setProjectInfo(res.info)
        setCommentsList(res.info.messages)
    }

    //props qui permet de rafraichir la page lors de la suppression d'un commentaire dans le composant "MessageCArd"
    const refresh = () => {
        fetchProjectData(id)
    }

    //display le nom de l'utilisateur au click sur sa photo dans l'input des commentaires
    const answerHandler = (username) => {
        setComment('@' + username + ' ' + comment)
    }


    //Display la "PromptCard" du projet en haut de la page 
    let projet
    let comments
    if (projectInfo._id) {
        projet = <PromptCard id={id}
            username={projectInfo.userId.username}
            firstname={projectInfo.userId.firstname}
            picture={projectInfo.userId.picture}
            stars={projectInfo.rating}
            audio={projectInfo.audio}
            projectName={projectInfo.title}
            genre={projectInfo.genre}
            prompt={projectInfo.prompt}
        />

        //display l'intégralité des commentaires qui lui sont attribué en sous doc
        comments = commentsList.map((data, i) => {
            return (
                < MessageCard key={i} comment={data.comment} userId={data.userId} idProject={id}
                    refresh={refresh}
                    answerHandler={answerHandler}
                />
            )
        }).reverse()

        if (!comments.length) {
            comments = <div className={styles.noMessage}>Aucun commentaire</div>
        }

    }


    return (
        <div className={styles.main}>
            <Header></Header>
            <div className={styles.topCommentPage}>
                <button className={styles.btn} onClick={handleBack}>Retour</button>
                <div className={styles.promptCardContainer}>
                    {projet}
                </div>
                <button className={styles.btn} onClick={handleUse}>Utiliser ce modèle</button>
            </div>
            <div className={styles.commentsContainer}>
                {comments}
            </div>
            <div className={styles.addYourOwnCommentContainer}>
                <textarea placeholder='Laisser un commentaire' className={styles.commentInput} onChange={(e) => setComment(e.target.value)}
                    autofocus={'true'}
                    value={comment}
                    maxLength={250} />
                <button className={styles.postYrCommentBtn} onClick={() => postComment()}>Publier</button>
            </div>

        </div>
    )
}

export default ProjectComments;