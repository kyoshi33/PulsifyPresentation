import styles from '../styles/MessageCard.module.css';
import { useSelector } from 'react-redux';

import UserCard from './UserCard'


function MessageCard() {
    const user = useSelector((state) => state.user.value)


    return (
        <div className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
                <UserCard email='Doe' username='Julien' />
            </div>
            <div className={styles.listItemMessage}>
                Message
            </div>
        </div>

    );
}

export default MessageCard;
