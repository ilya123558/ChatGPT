import { useState } from 'react';
import ChatItem from '../ChatItem/ChatItem';
import styles from './ChatList.module.scss';

const chatList = [
    {title: "Greetings and Assistance Offered"}, 
    {title: "Greetings and Assistance Offered"}
]

const ChatList: React.FC = () => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    return (
        <ul className={styles.chatList}>
            {chatList.map((elem, index) => (
                <ChatItem
                    key={index}
                    title={elem.title}
                    index={index}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            ))}

        </ul>
    );
};

export default ChatList;