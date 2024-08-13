import styles from '../styles/MessageCard.module.css';
import { useSelector } from 'react-redux';

import UserCard from './UserCard'


function MessageCard(props) {


    return (
        <div className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
                <UserCard
                // email={props.userId.email} username={props.userId.username} picture={props.userId.picture} 
                />
            </div>
            <div className={styles.listItemMessage}>
                {props.comment}
            </div>
        </div>

    );
}

export default MessageCard;
