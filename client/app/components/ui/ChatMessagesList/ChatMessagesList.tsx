import BotMessage from '../BotMessage/BotMessage';
import UserMessage from '../UserMessage/UserMessage';
import styles from './ChatMessagesList.module.scss';

const ChatMessagesList: React.FC = () => {
    return (
        <div className={styles.chatMessagesList}>
            <UserMessage />
            <BotMessage />
        </div>
    );
};

export default ChatMessagesList;