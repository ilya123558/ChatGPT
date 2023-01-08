import { useState } from 'react';
import styles from './ChatList.module.scss';

const text = "Greetings and Assistance Offered"
const chatList = ['item', 'item']

const ChatList: React.FC = () => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [editor, setEditor] = useState(false)

    return (
        <ul className={styles.chatList}>
            {chatList.map((elem, index) => (
                <li
                    key={index}
                    className={activeIndex === index ? styles.chatItemActive : styles.chatItem}
                    onClick={(() => setActiveIndex(index))}
                >
                    <div className={styles.textMessageInner}>
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 22 22" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <p className={((text.length > (activeIndex === index ? 21 : 29)) ? styles.textMessageOverflow : styles.textMessage)
                            + ' ' +
                            (activeIndex === index ? styles.textMessageActive : '')
                        }>{text}</p>
                    </div>
                    {activeIndex === index &&
                        <div className={styles.btnWrapper}>
                            <button className={styles.btn}>
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                            </button>
                            <button className={styles.btn}>
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        </div>
                    }
                </li>
            ))}

        </ul>
    );
};

export default ChatList;