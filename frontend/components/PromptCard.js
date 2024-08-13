import styles from '../styles/PromptCard.module.css';
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faHeart, faCircleExclamation, faStar, faCircleXmark, faComment } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { addLike, removeLike } from '../reducers/user';
import SignalementModal from './SignalementModal';
import UserCard from './UserCard';



function PromptCard(props) {
    const router = useRouter()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)

    // Open project modal on click on "Enregistrer"
    const openProjectModal = () => {
        setIsOpen(true)
    }
    const closeProjectModal = () => {
        setIsOpen(false);
    }

    const removePrompt = () => {
        fetch('http://localhost:3000/projects/prompt', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, id: props.id })
        })
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    Error('Erreur lors de la récupération des prompts');
                } else {
                    console.log("Successfully deleted one document.")
                    props.onRemove()
                }
            });
    }

    const like = async (props) => {
        let id = props.id
        await fetch("http://localhost:3000/users/like", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, id: id, token: user.token })
        })
        if (!user.liked.includes(props.id)) {
            dispatch(addLike(props.id))
        } else {
            dispatch(removeLike(props.id))
        }
        console.log(props)
    }

    const handleCardClick = () => {
        router.push(`/ProjectComments?id=${props.id}`); // Navigate to the ProjectComments page with the project ID as a query parameter
    }


    const displayXmark =
        <FontAwesomeIcon icon={faCircleXmark} className={styles.xmark} onClick={() => removePrompt()} />


    const displayUser =
        <div className={styles.author}>
            <UserCard firstname={props.firstname} username={props.username} picture={props.picture} />
        </div>;
    const displayicons =
        <>
            {!props.isOnMyProjects && (props.username !== user.username && <FontAwesomeIcon icon={faHeart} className={user.liked.includes(props.id) ? styles.likedIcon : styles.icon} onClick={() => like(props)} />)}
            <FontAwesomeIcon icon={faComment} className={styles.icon} onClick={handleCardClick} />
            <FontAwesomeIcon icon={faCircleExclamation} onClick={() => openProjectModal()} className={styles.icon} />
            <SignalementModal isOpen={modalIsOpen}
                onRequestClose={closeProjectModal}
                id={props.id}
            />
        </>

    let play =
        <div className={styles.iconsBox}>
            <FontAwesomeIcon icon={faPlay} className={styles.icon} />
            {!props.isOnProfile && displayicons}
            {props.isOnMyProjects && displayicons}
        </div>
    if (isPlaying) {
        play =
            <div className={styles.iconsBox}>
                <FontAwesomeIcon icon={faPause} className={styles.icon} />
                {!props.isOnProfile && displayicons}
                {props.isOnMyProjects && displayicons}
            </div>
    }

    return (
        <div className={styles.promptContainer}>
            <div className={styles.itemContainer} >
                {!props.isOnProfile && displayUser}

                <div className={styles.titleBox}>
                    <div className={styles.titleBackground}>
                        <div className={styles.title}>
                            {props.projectName}
                        </div>
                    </div>
                    <div className={styles.genre}>
                        {props.genre}
                    </div>

                    <div className={styles.score}>
                        <FontAwesomeIcon icon={faStar} className={props.stars >= 1 ? styles.star : styles.starGrey} />
                        <FontAwesomeIcon icon={faStar} className={props.stars >= 2 ? styles.star : styles.starGrey} />
                        <FontAwesomeIcon icon={faStar} className={props.stars >= 3 ? styles.star : styles.starGrey} />
                        <FontAwesomeIcon icon={faStar} className={props.stars >= 4 ? styles.star : styles.starGrey} />
                        <FontAwesomeIcon icon={faStar} className={props.stars === 5 ? styles.star : styles.starGrey} />
                    </div>
                </div>
                <div className={styles.itemPrompt}>
                    {props.prompt}
                </div>
                <div className={styles.iconsBox} onClick={() => setIsPlaying(!isPlaying)}>
                    {play}

                </div>
                {props.isOnProfile && displayXmark}
            </div>

        </div >

    );
}

export default PromptCard;
