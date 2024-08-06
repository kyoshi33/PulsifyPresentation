import styles from '../styles/MessageCard.module.css';
import { useSelector } from 'react-redux';


function MessageCard() {
    const user = useSelector((state) => state.user.value)


    return (
        <div className={styles.listItemContainer}>
            <div className={styles.listItemTitle}>
                <div>
                    Name
                </div>
                <div>
                    Username
                </div>
            </div>
            <div className={styles.listItemMessage}>
                Message
            </div>
        </div>

    );
}

export default MessageCard;
