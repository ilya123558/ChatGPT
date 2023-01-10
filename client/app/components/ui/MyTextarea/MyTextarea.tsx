import React, { useEffect, useRef, useState } from 'react';
import styles from './MyTextarea.module.scss';

const MyTextarea: React.FC = () => {

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const [value, setValue] = useState('')
    const [height, setHeight] = useState(19)

    console.log(textareaRef.current?.scrollHeight, height)

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

    return (
        <div className={styles.wrapper}>
            <div className={styles.blurEffect}></div>
            <div className={styles.myTextarea}>
                <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    style={{
                        height: height,
                        overflowY: height < 19 * 4 ? 'hidden' : 'scroll'
                    }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button className={styles.sendMessage}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                </button>
            </div>
        </div>


    );
};

export default MyTextarea;


