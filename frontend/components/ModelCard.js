import styles from '../styles/ModelCard.module.css';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

function ModelCard(props) {
    const user = useSelector((state) => state.user.value)


    return (
        <button className={styles.listItemContainer}>
            <div className={styles.author}>
                <UserCard username={props.username} firstname={props.firstname} picture={props.picture} ></UserCard>
            </div>
            <div className={styles.genre}>{props.genre}</div>
            <div className={styles.listItemPrompt}>{props.prompt}</div>
        </button>

    );
}

export default ModelCard;
