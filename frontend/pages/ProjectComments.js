import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";

import Header from '../components/Header';
import styles from '../styles/ProjectComments.module.css'
import PromptCard from '../components/PromptCard';
import UserCard from '../components/UserCard';
import SignalementModal from '../components/SignalementModal';

function ProjectComments() {
    const user = useSelector((state) => state.user.value)
    const [commentsList, setCommentsList] = useState(["coucou", "couilles", "bite", "j'en aurai bouffé du CSS", "je sais plus", "quoi taper", "pour tester", "ma scrollBar", "plus un truc"])
    const [comment, setComment] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false);
    const [projectInfo, setProjectInfo] = useState({})
    const router = useRouter();
    const { id } = router.query; // Retrieve the project ID from the query parameters

    const handleBack = () => {
        router.back();
    };

    const openSignalementModal = () => {
        setIsOpen(true)
    }

    const closeSignalementModal = () => {
        setIsOpen(false)
    }

    const postComment = () => {
        setCommentsList([...commentsList, comment])
        setComment('')
    }

    useEffect(() => {
        if (id) {
            fetchProjectData(id)
            // Fetch the project data using the ID, or perform any required logic
            console.log('Project ID:', id);
            // You can use this ID to fetch data associated with the specific project
        }
    }, []);

    const fetchProjectData = async (id) => {
        console.log('id :', id)
        const fetchData = await fetch(`http://localhost:3000/projects/ProjectById`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id }),
        });
        console.log('fetchData :', fetchData)
        const res = await fetchData.json()
        console.log('project info :', res.info)
        setProjectInfo(res.info)
    }

    const comments = commentsList.map((data, i) => {
        return (
            <div key={i} className={styles.fullComment}>
                <UserCard className={styles.userCardInComment}></UserCard>
                <div className={styles.textComment}>{data}</div>
                <FontAwesomeIcon icon={faCircleExclamation}
                    onClick={() => openSignalementModal()}
                    className={styles.signalementIcon} />
                <SignalementModal isOpen={modalIsOpen}
                    onRequestClose={closeSignalementModal}

                />
            </div>
        )
    })

    return (
        <div className={styles.main}>
            <Header></Header>
            <div className={styles.topCommentPage}>
                <button className={styles.btn} onClick={handleBack}>Retour</button>
                <button className={styles.btn}>Utiliser ce modèle</button>
            </div>
            <div className={styles.promptCardContainer}>
                <PromptCard id={id} username={projectInfo.userId.username}
                    firstname={projectInfo.userId.firstname}
                    picture={projectInfo.userId.picture}
                    rating={projectInfo.rating}
                    projectName={projectInfo.title}
                    genre={projectInfo.genre}
                    prompt={projectInfo.prompt}></PromptCard>
            </div>
            <div className={styles.commentsContainer}>
                {comments}
            </div>
            <div className={styles.addYourOwnCommentContainer}>
                <textarea placeholder='enter your comment' className={styles.commentInput} onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    maxLength={250} />
                <button className={styles.postYrCommentBtn} onClick={() => postComment()}>Publier</button>
            </div>

        </div>
    )
}

export default ProjectComments;