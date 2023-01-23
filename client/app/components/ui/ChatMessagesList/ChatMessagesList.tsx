import { useAppSelector } from '@hooks/redux';
import { useGetAllChatsQuery } from '@services/ChatService.api';
import { IChat } from 'models/IChat';
import { useEffect, useRef, useState } from 'react';
import BotMessage from '../BotMessage/BotMessage';
import UserMessage from '../UserMessage/UserMessage';
import styles from './ChatMessagesList.module.scss';

const ChatMessagesList: React.FC = () => {

    const activeChatIndex = useAppSelector(state => state.state.activeChatIndex)
    const newUserMessage = useAppSelector(state => state.state.newUserMessage)

    const [chat, setChat] = useState<IChat | null>(null)
    const { data } = useGetAllChatsQuery(null)

    const myRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        (async () => {
            if (data && activeChatIndex !== null) {
                await setChat(() => data[activeChatIndex])
            }

            await setTimeout(() => {
                if (myRef.current)
                    myRef.current.scrollTop = myRef.current.scrollHeight;
            }, 200)
        })()

    }, [activeChatIndex, data, newUserMessage])


    return (
        <>
            {activeChatIndex !== null ?
                <div ref={myRef} className={styles.chatMessagesList}>
                    {chat && chat.chat.map((elem, index) => {
                        if (elem.entity === 'AI') {
                            return <BotMessage key={index} {...elem} />
                        }
                        return <UserMessage key={index} {...elem} />
                    })}
                    {
                        data && newUserMessage.chatId && newUserMessage.loadingBotMessage
                        &&
                        newUserMessage.chatId === data[activeChatIndex]._id
                        &&
                        <>
                            <UserMessage message={newUserMessage.message || ''} />
                            <BotMessage message='' loading={true} />
                        </>
                    }
                </div>
                :
                <>
                    {
                        newUserMessage.loadingBotMessage && newUserMessage.typeMessage === 'createChatAndSendMessage'
                            ?
                            < div className={styles.chatMessagesList}>
                                <>
                                    <UserMessage message={newUserMessage.message || ''} />
                                    <BotMessage message='' loading={true} />
                                </>
                            </div>
                            :
                            <div className={styles.newChatWrapper}>

                                <div className={styles.newChat}>
                                    <p className={styles.newChatText}>ChatGPT is a variant of the GPT-3 model, which was trained on a massive amount of text data sourced from the internet. This training allows ChatGPT to generate human-like text and respond to prompts in a way that mimics natural language. It is fine-tuned for tasks such as text completion, text generation, question answering, and conversation.</p>
                                    <p className={styles.newChatText}>ChatGPT is pre-trained on a diverse range of internet text, it can generate text that is coherent, fluent, and contextually appropriate. It can be fine-tuned for specific tasks such as language translation, summarization, and dialogue generation by training on task-specific data. It can also be used for more creative applications such as writing fiction or poetry.</p>
                                    <p className={styles.newChatText}>One of the benefits of ChatGPT is that it can be used without the need for task-specific training data, which makes it a useful tool for developers and researchers who want to quickly test ideas and generate text without having to first collect and label a large amount of training data.</p>
                                </div>
                            </div>
                    }

                </>
            }
        </>


    );
};

export default ChatMessagesList;