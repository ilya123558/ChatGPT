import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useGetAllChatsQuery, useSendMessageOrCreateChatMutation } from '@services/ChatService.api';
import React, { useEffect, useRef, useState } from 'react';
import { setActiveChatIndex, setLoading, setNewMessage } from 'slices/MainSlice';
import styles from './MyTextarea.module.scss';

const MyTextarea: React.FC = () => {

    const dispatch = useAppDispatch()
    const activeChatIndex = useAppSelector(state => state.state.activeChatIndex)
    
    const [sendMessage, { isLoading }] = useSendMessageOrCreateChatMutation()
    const { data } = useGetAllChatsQuery(null)

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const [value, setValue] = useState('')
    const [height, setHeight] = useState(19)

    useEffect(() => {
        if ((height < 19 * 4)) {
            (async () => await setHeight((prev) => {
                if (textareaRef.current) {
                    return textareaRef.current.scrollHeight
                }
                return prev
            }))()
        }

    }, [textareaRef.current?.scrollHeight])


    useEffect(() => {
        dispatch(setLoading(isLoading))
    }, [isLoading])

    const postMessage = async () => {
        const message = value
        await setValue('')

        if (value.trim().length < 4) {
            setValue(() => '')
            return
        }
        if (activeChatIndex !== null && data) {
            await dispatch(setNewMessage({
                loadingBotMessage: true,
                chatId: data[activeChatIndex]._id,
                typeMessage: 'sendMessage',
                message
            }))
            await sendMessage({ message, chatName: data[activeChatIndex].name, chatId: data[activeChatIndex]._id })
            await dispatch(setNewMessage({ loadingBotMessage: false }))
        }
        else {
            await dispatch(setNewMessage({
                loadingBotMessage: true,
                typeMessage: 'createChatAndSendMessage',
                message
            }))
            await sendMessage({
                message,
                chatName: `${message.split(' ').slice(0, 6).join(' ')} ${message.split(' ').length > 6 ? '...' : ''}`
            })
            await dispatch(setNewMessage({ loadingBotMessage: false }))
            data && await dispatch(setActiveChatIndex(data.length))
        }

        await setHeight(() => 19)
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        const eventValue = event.target.value

        if (eventValue[eventValue.length - 1] === '\n') {
            postMessage()
            return
        }
        setValue(eventValue)
    }

    return (
        <div className={styles.myTextareaInner}>
            <div className={styles.myTextarea}>
                <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    style={{
                        height: height,
                        overflowY: height < 19 * 4 ? 'hidden' : 'scroll'
                    }}
                    value={value}
                    onChange={onChangeHandler}
                />
                <button className={styles.sendMessage} onClick={() => postMessage()}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                </button>
            </div>
        </div>

    );
};

export default MyTextarea;

