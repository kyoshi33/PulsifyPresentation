import styles from '../styles/PromptCard.module.css';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCircleExclamation, faStar, faCircleXmark, faComment } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { addLike, removeLike } from '../reducers/user';
import UserCard from './UserCard';
import SignalementModal from './SignalementModal';


function PromptCard(props) {
    const router = useRouter()
    const [modalIsOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)

    // Ouvrir la modal Project au click sur "Enregistrer" 
    const openSignalementModal = () => {
        setIsOpen(true)
    }
    const closeSignalementModal = () => {
        setIsOpen(false);
    }

    const removePrompt = () => {
        const { email, token } = user;
        fetch('http://localhost:3000/projects/prompt', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, token, id: props.id })
        })
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    Error('Erreur lors de la récupération des prompts');
                } else {
                    Error("Successfully deleted one document.")
                    props.onRemove()
                }
            });
    }

    const like = async (props) => {
        let id = props.id
        const { email, token } = user;
        await fetch("http://localhost:3000/users/like", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, id, token })
        })
        if (!user.liked.includes(props.id)) {
            dispatch(addLike(props.id))
        } else {
            dispatch(removeLike(props.id))
        }
    }
    // Naviguer vers la page ProjectComments avec l'id du projet 
    const commentClick = () => {
        router.push(`/ProjectComments?id=${props.id}`);
    }


    const displayXmark =
        <FontAwesomeIcon icon={faCircleXmark} className={styles.xmark} onClick={() => removePrompt()} />


    const displayUser =
        <div className={styles.author}>
            {!props.isOnMyProjects ? <UserCard isOnExplore={props.isOnExplore} firstname={props.firstname} username={props.username} picture={props.picture} /> : <UserCard isOnExplore={props.isOnExplore} isOnMyProjects={props.isOnMyProjects} firstname={props.firstname} username={props.username} picture={props.picture} />}
        </div>;
    const displayicons =
        <>
            {!props.isOnMyProjects && (props.username !== user.username && <FontAwesomeIcon icon={faHeart} className={user.liked.includes(props.id) ? styles.likedIcon : styles.icon} onClick={() => like(props)} />)}
            <FontAwesomeIcon icon={faComment} className={styles.icon} onClick={commentClick} />
            <FontAwesomeIcon icon={faCircleExclamation} onClick={() => openSignalementModal()} className={styles.icon} />
            <SignalementModal isOpen={modalIsOpen}
                onRequestClose={closeSignalementModal}
                id={props.id}
            />
        </>

    let itemPrompt;

    if (props.isOnMyProjects) {
        itemPrompt = styles.itemPromptOnProfile
    } else {
        itemPrompt = styles.itemPrompt
    }
    const handleClick = (genre, title, prompt) => {

        if (!props.isOnExplore) {
            router.push({
                pathname: '/Project',
                query: { genre, title, prompt },
            });
        } else {
            router.push({
                pathname: '/Project',
                query: { genre },
            });
        }
    };

    return (
        <div className={styles.promptContainer}>
            <div className={styles.itemContainer}  >
                {!props.isOnProfile && displayUser}
                <div className={styles.titleBox} onClick={() => handleClick(props.genre, props.projectName, props.prompt)}>
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
                <div className={itemPrompt}>
                    {props.prompt}
                </div>
                <div className={styles.iconsBoxAndAudio} >
                    {props.audio && <audio className={styles.audioInput} type='file' controls src={props.audio} ></audio>}
                    <div className={styles.iconsBox} >
                        <div className={styles.iconsBox}>
                            {!props.isOnProfile && displayicons}
                            {props.isOnMyProjects && displayicons}
                            {props.isOnProfile && displayXmark}
                        </div>
                    </div>
                </div>

            </div>

        </div >

    );
}

export default PromptCard;
