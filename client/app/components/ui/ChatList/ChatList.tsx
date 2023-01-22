import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useGetAllChatsQuery } from '@services/ChatService.api';
import { useEffect, useState } from 'react';
import { setActiveChatIndex, setLoading } from 'slices/MainSlice';
import ChatItem from '../ChatItem/ChatItem';
import styles from './ChatList.module.scss';


const ChatList: React.FC = () => {

    const dispatch = useAppDispatch()
    const activeChatIndex = useAppSelector(state => state.state.activeChatIndex)

    const { data: chatList, isLoading } = useGetAllChatsQuery(null)

    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    useEffect(() => {
        if (isLoading) {
            dispatch(setLoading(true))
            return
        }
        dispatch(setLoading(false))
    }, [isLoading])

    useEffect(() => {
        dispatch(setActiveChatIndex(activeIndex))
    }, [activeIndex])

    useEffect(() => {
        if(activeIndex !== activeChatIndex) {
            setActiveIndex(() => activeChatIndex)
        }
    }, [activeChatIndex])

    return (
        <>
            {
                chatList &&
                <ul className={styles.chatList}>
                    {chatList.map((elem, index) => (
                        <ChatItem
                            key={index}
                            name={elem.name}
                            index={index}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            chatId={elem._id}
                        />
                    ))}

                </ul>
            }

        </>

    );
};

export default ChatList;