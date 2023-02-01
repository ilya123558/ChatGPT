import { useAppDispatch } from '@hooks/redux';
import { useDeleteChatMutation, useUpdateChatNameMutation } from '@services/ChatService.api';
import { useEffect, useRef, useState } from 'react';
import { setActiveChatIndex, setTitleInTag } from 'slices/MainSlice';
import styles from './ChatItem.module.scss';

interface IProps {
    index: number,
    activeIndex: number | null,
    name: string,
    setActiveIndex: (index: number) => void,
    chatId: string
}

const ChatItem: React.FC<IProps> = (props) => {

    const dispatch = useAppDispatch()

    const [deleteChat] = useDeleteChatMutation()
    const [updateChatName] = useUpdateChatNameMutation()

    const inputRef = useRef<HTMLInputElement>(null)
    const editRef = useRef<SVGSVGElement>(null)
    const deleteRef = useRef<SVGSVGElement>(null)

    const [editor, setEditor] = useState(false)
    const [text, setText] = useState(props.name)
    const [animation, setAnimation] = useState(false)

    const editorHandler = async () => {
        editRef.current?.removeEventListener('click', editorHandler)
        deleteRef.current?.removeEventListener('click', deleteChatHandler)

        await setEditor(true)
        await (() => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        })()
    }

    const deleteChatHandler = async () => {
        await dispatch(setActiveChatIndex(null))
        await deleteChat(props.chatId)
    }

    const onBlurHandler = async () => {
        editRef.current?.removeEventListener('click', editorHandler)
        deleteRef.current?.removeEventListener('click', deleteChatHandler)
        await updateChatName({ chatId: props.chatId, name: text })
        await setAnimation(() => true)
        await setEditor(false)
        await dispatch(setTitleInTag(text))
        await setTimeout(() => {
            editRef.current?.addEventListener('click', editorHandler)
            deleteRef.current?.addEventListener('click', deleteChatHandler)
        }, 600)
    }

    useEffect(() => {
        setTimeout(() => {
            editRef.current?.addEventListener('click', editorHandler)
            deleteRef.current?.addEventListener('click', deleteChatHandler)
        }, 600)
        setText(() => props.name)
    }, [props.activeIndex, props.name])

    useEffect(() => {
        if (animation) {
            setTimeout(() => {
                setAnimation(false)
            }, 2000)
        }
    }, [animation])

    return (
        <li
            className={props.activeIndex === props.index ? styles.chatItemActive : styles.chatItem}
            onClick={(() => props.setActiveIndex(props.index))}
        >
            <div className={styles.textMessageInner}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 22 22" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {editor
                    ?
                    <input
                        ref={inputRef}
                        className={styles.input}
                        type="text" value={text}
                        onChange={e => setText(e.target.value)}
                        onBlur={onBlurHandler}
                    />
                    :
                    <p className={(
                        (text.length > (props.activeIndex === props.index ? 21 : 29))
                            ? styles.textMessageOverflow
                            : styles.textMessage)
                        + ' ' +
                        (props.activeIndex === props.index
                            ? styles.textMessageActive
                            : '')
                        + ' ' +
                        (animation
                            ? styles.textAnimation
                            : '')
                    }>{text}</p>
                }

            </div>
            {props.activeIndex === props.index &&
                <div className={styles.btnWrapper}>
                    <button className={styles.btn} >
                        {editor ?
                            <svg onClick={() => editorHandler()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M5 12l5 5l10 -10"></path>
                            </svg>
                            :
                            <svg ref={editRef} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                        }
                    </button>
                    <button className={styles.btn}>
                        {editor ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path
                                    d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                                    fill="currentColor"
                                />
                            </svg>
                            :
                            <svg ref={deleteRef} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        }

                    </button>
                </div>
            }
        </li>
    );
};

export default ChatItem;